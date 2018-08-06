import {
  EvaEngine, DI, exceptions, wrapper, swagger
} from 'evaengine';
import serveStatic from 'serve-static';
import models from './entities';

require('dotenv').config();

const engine = new EvaEngine({
  projectRoot: `${__dirname}/..`,
  port: process.env.PORT || 15638
});
const logger = DI.get('logger');
engine.bootstrap();

const compileDistPath = `${__dirname}/../public`;
const config = DI.get('config').get('swagger');

const scanner = new swagger.ExSwagger({
  models,
  logger,
  compileDistPath,
  sourceRootPath: `${__dirname}/../build`,
  swaggerDocsTemplate: config,
  swaggerDocsPath: `${compileDistPath}/${config.host.replace(':', '.')}.json`
});


const app = EvaEngine.getApp();
app.get('/', wrapper(async (req, res) => {
  const content = await scanner.getSwaggerIndexHtml();
  res.send(content);
}));
app.use(serveStatic(scanner.getSwaggerUIPath()));
app.use(serveStatic(compileDistPath));

(async () => {
  let res = null;
  try {
    const docs = await scanner.exportJson();
    logger.info(`Validating swagger docs by command::: curl -X POST -d @${scanner.swaggerDocsPath} -H "Content-Type:application/json" http://online.swagger.io/validator/debug`);
    res = process.env.SWAGGER_VALID ? (await DI.get('http_client').request({
      url: 'http://online.swagger.io/validator/debug',
      method: 'POST',
      json: docs
    })) : null;
    if (res && res.schemaValidationMessages) {
      logger.error(res);
    } else {
      logger.info('Swagger validation all passed');
    }
    engine.run();
  } catch (e) {
    if (e instanceof exceptions.StandardException) {
      logger.error(e);
      logger.error('Prev error', e.getPrevError());
      logger.error(e.getDetails());
      return;
    }
    logger.error(e);
  }
})();

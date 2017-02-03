import { EvaEngine, DI, wrapper, swagger } from 'evaengine';
import serveStatic from 'serve-static';
import models from './entities';

const engine = new EvaEngine({
  projectRoot: `${__dirname}/..`,
  port: process.env.PORT || 15638
});
const logger = DI.get('logger');
const compileDistPath = `${__dirname}/../public`;

const scanner = new swagger.ExSwagger({
  models,
  logger,
  compileDistPath,
  sourceRootPath: `${__dirname}/../build`,
  swaggerDocsTemplate: DI.get('config').get('swagger')
});


const app = EvaEngine.getApp();
app.get('/', wrapper(async(req, res) => {
  const content = await scanner.getSwaggerIndexHtml();
  res.send(content);
}));
app.use(serveStatic(scanner.getSwaggerUIPath()));
app.use(serveStatic(compileDistPath));

(async() => {
  try {
    await scanner.exportJson();
    engine.run();
  } catch (err) {
    logger.error(err.stack);
  }
})();

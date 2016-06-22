import { EvaEngine, DI } from 'evaengine';
import httpMocker from 'node-mocks-http';
import EventEmitter from 'events';
import chai from 'chai';
import assert from 'assert';

const engine = new EvaEngine({
  projectRoot: `${__dirname}/..`,
  port: process.env.PORT || 3000
});
engine.bootstrap();

global.p = (...args) => {
  DI.get('logger').debug(...args);
};

module.exports.truncateAll = async(entities) => {
  const names = [];
  const allEntities = entities.getAll();
  for (const name in allEntities) {
    if (typeof allEntities[name].truncate === 'function' && allEntities[name].tableName) {
      names.push(`TRUNCATE \`${allEntities[name].tableName}\`;\n`);
    }
  }
  await entities.getInstance().query(names.join(''));
};

const mockResponse = () => httpMocker.createResponse({ eventEmitter: EventEmitter });
module.exports.mockResponse = mockResponse;
module.exports.mockRequest = (...args) => httpMocker.createRequest(...args);
module.exports.mockAuthRequest = (...args) => {
  const { params: params = {} } = args[0];
  params.api_key = DI.get('config').get('token.faker.key');
  args[0].params = params;
  return httpMocker.createRequest(...args);
};
module.exports.httpMocker = httpMocker;

// module.exports.assert = assert;
chai.should();
module.exports.assert = chai.assert;


const runController = async(controller, request, response = mockResponse()) =>
  new Promise((resolve, reject) => {
    controller.handle(request, response, err => reject(err));
    response.on('end', () => resolve(JSON.parse(response._getData())));
  });
module.exports.runController = runController;
module.exports.mochaAsync = (fn) => {
    return async (done) => {
        try {
            await fn();
            done();
        } catch (err) {
            done(err);
        }
    };
};
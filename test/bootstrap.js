import { EvaEngine, DI, utils } from 'evaengine';
import chai from 'chai';

const engine = new EvaEngine({
  projectRoot: `${__dirname}/..`,
  port: process.env.PORT || 3000
});
engine.bootstrap();

global.p = (...args) => {
  DI.get('logger').debug(...args);
};

module.exports = Object.assign(utils.test, {
  assert: chai.assert
});

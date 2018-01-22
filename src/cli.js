import { EvaEngine, DI, exceptions } from 'evaengine';
import * as HelloWorldCommands from './commands/hello_world';

const engine = new EvaEngine({
  projectRoot: `${__dirname}/..`
}, 'cli');
engine.registerCommands([
  HelloWorldCommands
]);

const logger = DI.get('logger');
global.p = (...args) => {
  logger.debug(...args);
};


(async() => {
  try {
    await engine.runCLI();
  } catch (e) {
    if (e instanceof exceptions.StandardException) {
      logger.warn(e.getDetails());
      return logger.warn(e.message);
    }
    logger.error(e);
  }
  const redis = DI.get('redis');
  if (redis.isConnected()) {
    redis.cleanup();
  }
  return true;
})();

process.on('unhandledRejection', (reason, promise) => {
  logger.error('unhandledRejection:', reason, promise);
});

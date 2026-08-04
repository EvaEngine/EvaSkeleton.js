import path from 'node:path';
import { fileURLToPath } from 'node:url';
import evaengine from 'evaengine';
import HelloWorldCommand from './commands/hello_world.js';

const { EvaEngine, DI, exceptions } = evaengine;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const engine = new EvaEngine({
  projectRoot: `${__dirname}/..`
}, 'cli');
engine.registerCommands([
  HelloWorldCommand
]);

const logger = DI.get('logger');
global.p = (...args) => {
  logger.debug(...args);
};

(async () => {
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

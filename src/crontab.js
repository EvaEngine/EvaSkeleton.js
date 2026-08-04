import path from 'node:path';
import { fileURLToPath } from 'node:url';
import evaengine from 'evaengine';
import HelloWorldCommand from './commands/hello_world.js';

const { EvaEngine, DI } = evaengine;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const engine = new EvaEngine({
  projectRoot: `${__dirname}/..`
}, 'cli');
engine.registerCommands([
  HelloWorldCommand
]);
const logger = DI.get('logger');
const timeout = process.env.STOP_TIMEOUT || 60;

engine.runCrontab('0/10 * * * * *', 'hello:world --id=EvaEngine');

['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGTERM', 'SIGABRT', 'SIGTSTP'].forEach((signal) => {
  process.on(signal, (sig) => {
    logger.info(`Clear all commands and callbacks, will quit after ${timeout} seconds.`);
    engine.clearCrontabs();
    let seconds = 0;
    setInterval(() => {
      seconds += 1;
      if (seconds >= timeout) {
        logger.info(`Crontab terminated by signal ${sig} after ${timeout} seconds.`);
        process.exit(1);
      }
    }, 1000);
  });
});

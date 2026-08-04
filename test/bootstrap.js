import path from 'node:path';
import { fileURLToPath } from 'node:url';
import evaengine from 'evaengine';
import { describe, before } from 'node:test';

const { EvaEngine, DI, utils } = evaengine;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const engine = new EvaEngine({
  projectRoot: `${__dirname}/..`,
  port: process.env.PORT || 3000
});
engine.bootstrap();

global.p = (...args) => {
  DI.get('logger').debug(...args);
};

export { describe, before };
export const { mockRequest, runController } = utils.test;
export default utils.test;

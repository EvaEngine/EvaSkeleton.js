import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import bodyParser from 'body-parser';
import evaengine from 'evaengine';
import indexRouter from './routes/index.js';
import helloWorldRouter from './routes/api/hello_world.js';

const { EvaEngine, DI, express } = evaengine;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const engine = new EvaEngine({
  projectRoot: `${__dirname}/..`,
  port: process.env.PORT || 3000
});
engine.bootstrap();

const app = EvaEngine.getApp();
const logger = DI.get('logger');
global.p = (...args) => {
  logger.debug(...args);
};

app.set('logger', logger);
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'pug');
app.set('trust proxy', () => true);

// -----------Middleware Start
app.use(DI.get('trace')('eva_skeleton'));
app.use(DI.get('debug')());
app.use(express.static(path.join(__dirname, '/../public')));
app.use(cors({
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// -----------Middleware End


// -----------Routers Start
app.use('/', indexRouter);
app.use('/v1', helloWorldRouter);
// -----------Routers End


engine.run();

process.on('unhandledRejection', (reason, promise) => {
  logger.error('unhandledRejection:', reason, promise);
});

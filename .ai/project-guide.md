# EvaSkeleton.js — AI Project Guide

> A skeleton project based on [EvaEngine.js](https://github.com/EvaEngine/EvaEngine.js).
> This document helps AI agents quickly scaffold a new project from this skeleton.

---

## Quick Start (for a new project)

```bash
# 1. Copy the skeleton
cp -r EvaSkeleton.js my-new-project
cd my-new-project

# 2. Init git & install
rm -rf .git node_modules
git init
git add .
git commit -m "chore: init from EvaSkeleton.js"
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your settings

# 4. Start developing
npm run dev
```

---

## Project Architecture

```
my-project/
├── .ai/                    # AI instructions (this file)
├── .github/workflows/      # CI/CD (GitHub Actions)
├── config/                 # EvaEngine config files (.cjs)
├── src/
│   ├── app.js              # Web entrypoint
│   ├── cli.js              # CLI entrypoint
│   ├── crontab.js          # Cron entrypoint
│   ├── swagger.js          # Swagger doc generator
│   ├── commands/           # CLI commands
│   ├── entities/           # Swagger entity definitions
│   ├── models/             # Sequelize models
│   └── routes/             # Express route handlers
│       └── api/            # API routes
├── test/
│   ├── bootstrap.js        # Test setup (shared)
│   └── routes/api/         # Route tests
├── views/                  # Pug templates
├── public/                 # Static assets
└── logs/                   # Log output (gitignored)
```

---

## Files You Can Copy As-Is

These files are boilerplate/config that rarely need changes:

| File | Purpose | Notes |
|------|---------|-------|
| `.nvmrc` | Node version pin | Contains `24` — update if needed |
| `.env.example` | Env template | Safe to copy, user edits `.env` |
| `eslint.config.js` | ESLint 9 flat config | Modern rules, works for any EvaEngine project |
| `.github/workflows/ci.yml` | CI/CD pipeline | Lint → Test → Semantic Release → Docker |
| `.releaserc.json` | Semantic release config | Standard conventional-commits setup |
| `nodemon.json` | Dev server watcher | Generic, works out of box |
| `Dockerfile` | Multi-stage Docker build | Node 24 Alpine, production-optimized |
| `Makefile` | Dev helper commands | Optional, can be removed |
| `views/` | Pug templates | `index.pug` and `error.pug` — generic |
| `public/` | Static assets | Empty directory, keep as placeholder |

---

## Files That Need Modification

### 1. `package.json` — **MUST modify**

```diff
- "name": "eva-skeleton"
+ "name": "my-project"
- "version": "0.0.0-development"
+ "version": "0.0.0-development"   # semantic-release manages this
- "repository.url": "https://github.com/EvaEngine/EvaSkeleton.js.git"
+ "repository.url": "https://github.com/your-org/your-repo.git"
```

Also review `dependencies` — remove what you don't need (e.g., `pug`, `serve-favicon`, `serve-static`).

### 2. `config/*.cjs` — **MUST modify**

All config files use `module.exports` (CommonJS). EvaEngine loads them by environment:

| File | Environment | When loaded |
|------|-------------|-------------|
| `config.default.cjs` | all | Always loaded first |
| `config.development.cjs` | `NODE_ENV=development` | Merged over defaults |
| `config.production.cjs` | `NODE_ENV=production` | Merged over defaults |
| `config.test.cjs` | `NODE_ENV=test` | Merged over defaults |

**What to change:**
- Database credentials (host, username, password, database name)
- Redis host/port
- Logger settings (file path, log level)
- Swagger host
- Token/JWT secrets

### 3. `src/app.js` — **MAY modify**

The web entrypoint. Modify if you need to:
- Add/remove middleware (cors, body-parser, etc.)
- Change route prefixes (`/v1` → `/api/v1`)
- Add custom error handling
- Change view engine or static file paths

**Key pattern:**
```js
import evaengine from 'evaengine';
const { EvaEngine, DI, express } = evaengine;

const engine = new EvaEngine({ projectRoot: `${__dirname}/..`, port: process.env.PORT || 3000 });
engine.bootstrap();
const app = EvaEngine.getApp();

// Add your middleware & routes here
app.use('/v1', myRouter);

engine.run();
```

### 4. `src/routes/` — **MUST modify**

- `src/routes/index.js` — Homepage route. Replace or keep.
- `src/routes/api/hello_world.js` — Demo API routes. **Replace with your actual API routes.**

**Route pattern:**
```js
import evaengine from 'evaengine';
const { EvaEngine, wrapper, exceptions } = evaengine;
const router = EvaEngine.createRouter();

router.get('/my-endpoint', wrapper(async (req, res) => {
  res.json({ hello: 'world' });
}));

export default router;
```

### 5. `src/commands/` — **MAY modify**

CLI commands. `hello_world.js` is a demo — replace or add your own.

**Command pattern:**
```js
import evaengine from 'evaengine';
const { Command, DI } = evaengine;

export default class MyCommand extends Command {
  static getName() { return 'my:command'; }
  static getDescription() { return 'Does something'; }
  static getSpec() { return { /* arg specs */ }; }
  async run() {
    const logger = DI.get('logger');
    logger.info('Running my command');
  }
}
```

### 6. `src/entities/` — **MAY modify**

Swagger entity definitions. The `index.js` auto-loads all files in the directory. Add/remove entity files as needed.

### 7. `src/models/` — **MAY modify**

Sequelize model auto-loader. The `index.js` auto-imports all `.js`/`.mjs` files. Add your Sequelize models here.

### 8. `src/cli.js` — **MAY modify**

CLI entrypoint. Update the list of registered commands:
```js
engine.registerCommands([
  MyCommand,
  AnotherCommand
]);
```

### 9. `src/crontab.js` — **MAY modify**

Cron entrypoint. Update cron schedule and command:
```js
engine.runCrontab('*/5 * * * * *', 'my:command --flag=value');
```

### 10. `src/swagger.js` — **MAY modify**

Swagger doc generator. Usually no changes needed unless you customize the Swagger UI path or validation.

### 11. `test/bootstrap.js` — **MAY modify**

Test setup. Usually no changes needed. Exports `mockRequest`, `runController` for route testing.

### 12. `test/routes/api/hello_world.js` — **MUST modify**

Demo test. Replace with tests for your actual routes.

**Test pattern:**
```js
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mockRequest, runController } from '../../bootstrap.js';
import myRouter from '../../../src/routes/my-router.js';

describe('My API', () => {
  it('should work', async () => {
    const res = await runController(myRouter, mockRequest({
      method: 'GET', url: '/my-endpoint'
    }));
    assert.equal(res.hello, 'world');
  });
});
```

---

## EvaEngine API Reference

```js
import evaengine from 'evaengine';

// Destructure what you need:
const {
  EvaEngine,     // Core engine class
  DI,            // Dependency injection container
  express,       // Express instance (app)
  wrapper,       // Async route error wrapper
  exceptions,    // Standardized exception classes
  Command,       // CLI command base class
  Entities,      // Swagger entity manager
  swagger,       // Swagger doc generator
  utils          // Test utilities (mockRequest, runController)
} = evaengine;
```

---

## Available npm Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `NODE_ENV=production node src/app.js` | Production server |
| `npm run dev` | `nodemon src/app.js` | Dev server with auto-reload |
| `npm test` | `node --test` | Run tests |
| `npm run test:watch` | `node --test --watch` | Watch mode tests |
| `npm run test:coverage` | `node --experimental-test-coverage --test` | Test with coverage |
| `npm run lint` | `eslint src test` | Lint check |
| `npm run lint:fix` | `eslint src test --fix` | Lint auto-fix |
| `npm run crontab` | `node src/crontab.js` | Run cron jobs |
| `npm run swagger` | `node src/swagger.js` | Generate Swagger docs |
| `npm run swagger-dev` | `nodemon src/swagger.js` | Swagger dev server |
| `npm run semantic-release` | `semantic-release` | Trigger release |

---

## CI/CD Pipeline (GitHub Actions)

The workflow in `.github/workflows/ci.yml` has 3 jobs:

1. **Lint & Test** — Runs on Node 22 & 24 for every push/PR to `master`
2. **Semantic Release** — Runs on push to `master`, auto-publishes GitHub releases
3. **Docker Build & Push** — Runs when a `v*` tag is pushed, pushes to Docker Hub

**Required GitHub Secrets:**
- `DOCKER_USERNAME` — Docker Hub username
- `DOCKER_PASSWORD` — Docker Hub password or access token

**Commit convention (Conventional Commits):**
```
feat: ...       → minor version bump
fix: ...        → patch version bump
BREAKING CHANGE → major version bump
chore/docs:     → no release
```

---

## Files You Can Delete

These are demo files that should be removed in a real project:

- `src/routes/api/hello_world.js` — Demo routes
- `src/commands/hello_world.js` — Demo CLI command
- `test/routes/api/hello_world.js` — Demo test
- `views/index.pug` — Replace with your own template
- `views/error.pug` — Replace with your own template
- `.travis.yml` — Already removed, but ensure it's gone

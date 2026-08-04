# EvaSkeleton.js

[![CI](https://github.com/EvaEngine/EvaSkeleton.js/actions/workflows/ci.yml/badge.svg)](https://github.com/EvaEngine/EvaSkeleton.js/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/evaengine.svg?maxAge=2592000?style=plastic)](https://github.com/EvaEngine/EvaSkeleton.js/blob/master/LICENSE)

A Skeleton project based on [EvaEngine.js](https://github.com/EvaEngine/EvaEngine.js)

## Start with one line code:

Prepare a empty directory:

```
mkdir myproject
cd myproject
```

``` shell
wget https://github.com/EvaEngine/EvaSkeleton.js/archive/master.tar.gz -O master.tar.gz && tar xvf master.tar.gz --strip 1 && rm master.tar.gz
```

## Run by Docker

```
docker run -p 3000:3000 -it allovince/evaskeleton:latest npm start
```

Then visit `http://localhost:3000/`

## Install and Start develop:

Requirements:

- Node.js >= v22 (recommended: v24)
- npm
- No Babel is required — the project runs on native ESM (`"type": "module"`)

*1*. Install dependencies

```
npm install
```

*2*. Copy the environment template

```
cp .env.example .env
```

*3*. Start project (development mode)

```
npm run dev
```

Visit http://localhost:3000/ to see the Hello World web page demo.

*4*. Generate API documents

```
npm run swagger-dev
```

Visit http://localhost:15638/ to see the Swagger demo.

*5*. CLI command (development mode)

```
node src/cli.js hello:world
```

*6*. Run tests

```
npm test
```

## Deploy to production server

*1*. Install global dependencies

```
make pre-build
```

*2*. Install project dependencies

```
make build
```

*3*. Start project

```
npm start
```


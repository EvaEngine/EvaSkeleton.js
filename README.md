# EvaSkeleton.js

[![Build Status](https://travis-ci.org/EvaEngine/EvaSkeleton.js.svg?branch=master)](https://travis-ci.org/EvaEngine/EvaSkeleton.js)
[![Dependencies Status](https://david-dm.org/EvaEngine/EvaSkeleton.js.svg)](https://david-dm.org/EvaEngine/EvaSkeleton.js)
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

- NodeJS >= v8


*1*. Install global dependencies

```
make pre-build
```

*2*. Install project dependencies

```
make build
```

*3*. Start project (development mode)

```
npm run dev
```

Visit http://localhost:3000/ to see HelloWorld web page demo

*4*. Generate API documents

```
npm run swagger-dev
```

Visit http://localhost:15638/ to see Swagger document demo


*5*. CLI command (development mode)

```
babel-node --harmony src/cli.js hello:world
```

*6*. Run unit test

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

*3*. Compile & Start project

```
npm run build
npm start
```


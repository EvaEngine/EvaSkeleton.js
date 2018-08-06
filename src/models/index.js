import fs from 'fs';
import path from 'path';

const models = {};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    const fileArray = file.split('.');
    return (file.indexOf('.') !== 0)
      && (['js', 'es6'].indexOf(fileArray.pop()) !== -1)
      && (fileArray[0] !== 'index');
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)); //eslint-disable-line
    models[model.default.name] = model.default;
  });

export default models;

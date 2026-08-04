import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const models = {};

const files = fs
  .readdirSync(__dirname)
  .filter((file) => {
    const fileArray = file.split('.');
    return (file.indexOf('.') !== 0)
      && (['js', 'mjs'].indexOf(fileArray.pop()) !== -1)
      && (fileArray[0] !== 'index');
  });

await Promise.all(files.map(async (file) => {
  const { default: model } = await import(path.join(__dirname, file));
  models[model.name] = model;
}));

export default models;

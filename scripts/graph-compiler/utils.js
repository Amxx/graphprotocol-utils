const fs   = require('fs');
const path = require('path');

Array.prototype.unique = function(op = x => x) {
  return this.filter((obj, i) => this.findIndex(entry => op(obj) === op(entry)) === i);
}

Object.prototype.isEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}

function assert(condifiton, error = 'assertion failed') {
  if (!condifiton) {
    throw new Error(error);
  }
}

function readFile(file) {
  return fs.readFileSync(file, { encoding: 'utf8' });
}

function writeFile(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data, { encoding: 'utf-8' });
}

module.exports = {
  assert,
  readFile,
  writeFile,
};

'use strict';

const fs = require('fs');
const path = require('path');
const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('../../knexfile');
const {
  envConfig: { NODE_ENV },
} = require('../../config');

const basename = path.basename(__filename);
const db = {};

// Initialise Knex
const knex = Knex(knexConfig[NODE_ENV]);
db.knex = knex;

Model.knex(knex);

// Helpers
// eslint-disable-next-line no-underscore-dangle
function _isDotFile(fileName) {
  return fileName.indexOf('.') === 0;
}
// eslint-disable-next-line no-underscore-dangle
function _isCurrentFile(fileName) {
  return fileName === basename;
}

// eslint-disable-next-line no-underscore-dangle
function _fileHasExtension(fileName, ext) {
  const newext = ext.startsWith('.') ? ext : `.${ext}`;
  return fileName.slice(-newext.length) === newext;
}

// Make models accessible on the single "db" export
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      !_isDotFile(file) &&
      !_isCurrentFile(file) &&
      _fileHasExtension(file, '.js')
    );
  })
  .forEach((file) => {
    const modelFile = path.join(__dirname, file);
    const { model } = require(modelFile); // eslint-disable-line global-require
    db[model.name] = model;
  });

module.exports = db;

/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable strict */

'use strict'

const fs = require('fs')
const path = require('path')
const Knex = require('knex')
const { Model } = require('objection')
const knexConfig = require('../../knexfile')

const basename = path.basename(__filename)
const db = {}

// Initialise Knex
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
db.knex = knex

Model.knex(knex)

// Make models accessible on the single "db" export
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      !_isDotFile(file) &&
      !_isCurrentFile(file) &&
      _fileHasExtension(file, '.js')
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).model
    db[model.name] = model
  })

module.exports = db

// Helpers
// eslint-disable-next-line no-underscore-dangle
function _isDotFile(fileName) {
  return fileName.indexOf('.') === 0
}
// eslint-disable-next-line no-underscore-dangle
function _isCurrentFile(fileName) {
  return fileName === basename
}
// eslint-disable-next-line no-underscore-dangle
function _fileHasExtension(fileName, ext) {
  if (!ext.startsWith('.')) ext = `.${ext}`
  return fileName.slice(-ext.length) === ext
}

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
// eslint-disable-next-line import/order

module.exports = require('knex')(configuration)

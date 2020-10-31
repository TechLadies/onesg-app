const ENV = process.env.NODE_ENV || 'development';
const knex = require('knex');
const configuration = require('../../knexfile')[ENV];

// eslint-disable-next-line global-require
const envConfig = require(`./${ENV}.js`) || {};
const dbConfig = knex(configuration);

module.exports = {
  envConfig,
  dbConfig,
};

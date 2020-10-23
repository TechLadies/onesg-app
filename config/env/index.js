const ENV = process.env.NODE_ENV || 'development';

// eslint-disable-next-line global-require
module.exports = require(`./${ENV}.js`) || {};

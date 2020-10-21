<<<<<<< HEAD
const ENV = process.env.NODE_ENV || 'development';

=======
const ENV = process.env.NODE_ENV || 'development'
>>>>>>> changed db to postgres & tested with referee
// eslint-disable-next-line global-require
module.exports = require(`./${ENV}.js`) || {};

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://@localhost/onesg',
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}`,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    // SSL: https://help.heroku.com/MDM23G46/why-am-i-getting-an-error-when-i-upgrade-to-pg-8
    ssl: {
      rejectUnauthorized: false,
    },
    useNullAsDefault: true,
  },
};

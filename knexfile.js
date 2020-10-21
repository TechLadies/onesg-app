module.exports = {
  /* development: {
    client: 'sqlite3',
    connection: {
      filename: 'database/one-sg.db',
    },
    useNullAsDefault: true,
  }, */
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
    connection: `${process.env.DATABASE_URL}?ssl=true`,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    useNullAsDefault: true,
  },
};

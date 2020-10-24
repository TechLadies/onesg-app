module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: 'database/one-sg.db',
    },
    useNullAsDefault: true,
  },
};

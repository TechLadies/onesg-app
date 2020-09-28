const tableName = require('../models/user')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {
          firstName: 'tech',
          lastName: 'lady',
          email: 'test1@test.com',
          passwordHash: 'abc123',
          occupation: 'Software Engineer',
        },
      ]);
    });
};

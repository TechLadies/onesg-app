const { tableComments } = require('../src/models/comment');

exports.seed = function seedCommentsTable(knex) {
  // Deletes ALL existing entries
  return knex(tableComments)
    .del()
    .then(function insertComments() {
      // Inserts seed entries
      return knex(tableComments).insert([
        {
          caseNumber: 'EF2020-11001',
          message: 'This is message #1 in case number EF2020-11001',
          author: 'Angela',
        },
        {
          caseNumber: 'EF2020-11001',
          message: 'This is message #2 in case number EF2020-11001',
          author: 'Patrick',
        },
        {
          caseNumber: 'EF2020-11002',
          message: 'This is message #1 in case number EF2020-11002',
          author: 'Patrick',
        },
        {
          caseNumber: 'EF2020-11002',
          message: 'This is message #2 in case number EF2020-11002',
          author: 'Angela',
        },
      ]);
    });
};

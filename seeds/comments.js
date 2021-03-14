const { tableComments } = require('../src/models/comment');

exports.seed = function seedCommentsTable(knex) {
  // Deletes ALL existing entries
  return knex(tableComments)
    .del()
    .then(function insertComments() {
      // Inserts seed entries
      return knex(tableComments).insert([
        {
          caseId: 1,
          message: 'This is message #1 in case id 1',
          staffId: 1,
        },
        {
          caseId: 2,
          message: 'This is message #1 in case id 2',
          staffId: 2,
        },
        {
          caseId: 1,
          message: 'This is message #2 in case id 1',
          staffId: 1,
        },
        {
          caseId: 2,
          message: 'This is message #2 in case id 2',
          staffId: 2,
        },
      ]);
    });
};

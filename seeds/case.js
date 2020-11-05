const { tableCase } = require('../src/models/case');
const {
  requestTypeEnum,
  fulfilmentTypeEnum,
  caseStatusTypeEnum,
  referenceStatusTypeEnum,
  approvalTypeEnum,
} = require('../src/models/case.js');

exports.seed = function seedCaseTable(knex) {
  // Deletes ALL existing entries
  return knex(tableCase)
    .del()
    .then(function insertCases() {
      // Inserts seed entries
      return knex(tableCase).insert([
        {
          refereeId: 'R202011-0001',
          name: 'Atu',
          email: 'ahl@aok.com',
          phone: '34673662',
          organisation: 'Techladies',
        },
        {
          refereeId: 'R202011-0002',
          name: 'Siddique',
          email: 'cropoc@hotmail.com.',
          phone: '90093711',
          organisation: 'Siddique Impex',
        },
      ]);
    });
};

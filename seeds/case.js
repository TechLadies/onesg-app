const { tableCase } = require('../src/models/case');

exports.seed = function seedCaseTable(knex) {
  // Deletes ALL existing entries
  return knex(tableCase)
    .del()
    .then(function insertCases() {
      // Inserts seed entries
      return knex(tableCase).insert([
        {
          caseNumber: 'EF2020-11001',
          caseStatus: 'NEW',
          appliedOn: '2020-11-01', // YYYY-MM-DD
          pointOfContact: 'Adam Goh',
          referenceStatus: 'UNVERIFIED',
          amountRequested: '350.55',
          amountGranted: '350',
          refereeId: 1,
          beneficiaryId: 1,
          createdBy: 1,
          updatedBy: 1,
        },
        {
          caseNumber: 'EF2020-11002',
          caseStatus: 'PENDING',
          appliedOn: '2020-11-01',
          pointOfContact: 'John Lim',
          referenceStatus: 'PENDING',
          casePendingReason: 'Beneficiary uncontactable',
          amountRequested: '175.50',
          amountGranted: '0',
          beneficiaryId: 2,
          createdBy: 2,
          updatedBy: 2,
        },
      ]);
    });
};

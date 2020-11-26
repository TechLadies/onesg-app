const { tableCase } = require('../src/models/case');

exports.seed = function seedCaseTable(knex) {
  // Deletes ALL existing entries
  return knex(tableCase)
    .del()
    .then(function insertCases() {
      // Inserts seed entries
      return knex(tableCase).insert([
        {
          caseId: 'EF2020-11001',
          caseStatus: 'NEW',
          appliedOn: '2020-11-01', // YYYY-MM-DD
          pointOfContact: '',
          referenceStatus: 'UNVERIFIED',
          amountRequested: '350.55',
          amountGranted: '350',
          refereeId: 'R2020-11001',
          beneficiaryId: 'B2020-11002',
          createdBy: '1',
          updatedBy: '1',
        },
        {
          caseId: 'EF2020-11002',
          caseStatus: 'PENDING',
          pointOfContact: 'John Lim',
          referenceStatus: 'PENDING',
          casePendingReason: 'Beneficiary uncontactable',
          amountRequested: '175.50',
          refereeId: 'R2020-11002',
          beneficiaryId: 'B2020-11003',
          createdBy: '2',
          updatedBy: '2',
        },
      ]);
    })
    .then(function updateCaseEF202011001() {
      return knex
        .table(tableCase)
        .where({ caseId: 'EF2020-11001' })
        .update({
          documents: JSON.stringify([
            { title: 'Application form', url: 'http://www.link.com' },
            { title: 'Receipt', url: 'http://www.receipt.com' },
          ]),
        });
    });
};

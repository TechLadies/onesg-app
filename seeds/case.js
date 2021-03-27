const { tableCase } = require('../src/models/case');

exports.seed = function seedCaseTable(knex) {
  // Deletes ALL existing entries
  return knex(tableCase)
    .del()
    .then(function insertCases() {
      // Inserts seed entries
      return knex(tableCase).insert([
        {
          caseNumber: 'EF2010-02004',
          caseStatus: 'CLOSED',
          appliedOn: '2010-02-06',
          pointOfContact: 'Adam Goh',
          referenceStatus: 'VERIFIED',
          amountRequested: '350.00',
          amountGranted: '350.00',
          refereeId: 1,
          beneficiaryId: 1,
          createdBy: 2,
          updatedBy: 2,
        },
        {
          caseNumber: 'EF2020-08020',
          caseStatus: 'PROCESSING',
          appliedOn: '2020-08-15',
          pointOfContact: 'Esther Lim',
          referenceStatus: 'VERIFIED',
          amountRequested: '3000.00',
          amountGranted: '1000.00',
          beneficiaryId: 2,
          createdBy: 2,
          updatedBy: 2,
        },
        {
          caseNumber: 'EF2020-11001',
          caseStatus: 'REFERRED',
          appliedOn: '2020-11-01', // YYYY-MM-DD
          pointOfContact: 'Adam Goh',
          referenceStatus: 'VERIFIED',
          amountRequested: '350.00',
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
          beneficiaryId: 2,
          createdBy: 2,
          updatedBy: 2,
        },
        {
          caseNumber: 'EF2021-01001',
          caseStatus: 'REFERRED',
          appliedOn: '2021-01-05',
          pointOfContact: 'Melissa Tee',
          referenceStatus: 'VERIFIED',
          amountRequested: '80.00',
          refereeId: 2,
          beneficiaryId: 3,
          createdBy: 2,
          updatedBy: 2,
        },
        {
          caseNumber: 'EF2021-03018',
          caseStatus: 'NEW',
          appliedOn: '2021-03-05',
          pointOfContact: 'John Lim',
          referenceStatus: 'PENDING',
          casePendingReason: 'Referee on vacation',
          amountRequested: '200.50',
          beneficiaryId: 1,
          createdBy: 2,
          updatedBy: 2,
        },
      ]);
    });
};

const { tableCase } = require('../src/models/case');
const {
  caseStatusEnum,
  referenceStatusEnum,
} = require('../src/models/case.js');

exports.seed = function seedCaseTable(knex) {
  // Deletes ALL existing entries
  return knex(tableCase)
    .del()
    .then(function insertCases() {
      // Inserts seed entries
      return knex(tableCase).insert([
        {
          caseId: 'EF2020-11001',
          caseStatus: caseStatusEnum.new,
          appliedOn: '2020-11-01', // 2018-11-13
          pointOfContact: 'Sarah Tan',
          referenceStatus: referenceStatusEnum.unverified,
          amountRequested: '350.55',
          amountGranted: '350.55',
          documents: `{{'Application form', 'http://www.link.com'}, {'Receipt', 'http://www.receipt/com'}}`,
          refereeId: 'R2020-11001',
          beneficiaryId: 'B2020-11002',
          createdBy: '1',
          updatedBy: '1',
        },
        {
          caseId: 'EF2020-11002',
          caseStatus: caseStatusEnum.pending,
          appliedOn: '2020-11-02', // 2018-11-13
          pointOfContact: 'John Lim',
          referenceStatus: referenceStatusEnum.pending,
          pendingStatusReason: 'Beneficiary uncontactable',
          amountRequested: '100',
          documents: `{{'Application form', 'http://www.anotherlink.com'}}`,
          refereeId: 'R2020-11002',
          beneficiaryId: 'B2020-11003',
          createdBy: '2',
          updatedBy: '2',
        },
      ]);
    });
};

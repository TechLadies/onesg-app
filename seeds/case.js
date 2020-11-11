const { tableCase } = require('../src/models/case');
const {
  RequestTypeEnum,
  FulfilmentTypeEnum,
  CaseStatusTypeEnum,
  ReferenceStatusTypeEnum,
  ApprovalTypeEnum,
} = require('../src/models/case.js');

exports.seed = function seedCaseTable(knex) {
  // Deletes ALL existing entries
  return knex(tableCase)
    .del()
    .then(function insertCases() {
      // Inserts seed entries
      return knex(tableCase).insert([
        {
          beneficiaryId: '0001',
          refereeId: '0001',
          caseId: 'EF 2020-1101',
          requestType: RequestTypeEnum.cookedFood,
          fulfilment: FulfilmentTypeEnum.inKindDonation,
          POC: 'Techladies',
          amountRequested: '450.03',
          description: 'due to debt',
          caseStatus: CaseStatusTypeEnum.new,
          referenceStatus: ReferenceStatusTypeEnum.unverified,
          approval: ApprovalTypeEnum.NIL,
          amountGranted: '450.03',
        },
      ]);
    });
};

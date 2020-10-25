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
          BeneficiaryId: '0001',
          RefereeId: '1002',
          CaseId: '20002',
          RequestType: RequestTypeEnum.CookedFood,
          Fulfilment: FulfilmentTypeEnum.InKindDonation,
          POC: 'Techladies',
          AmountRequested: '450.03',
          Description: 'due to debt',
          CaseStatus: CaseStatusTypeEnum.New,
          ReferenceStatus: ReferenceStatusTypeEnum.Unverified,
          Approval: ApprovalTypeEnum.NIL,
          AmountGranted: '450.03',
        },
      ]);
    });
};

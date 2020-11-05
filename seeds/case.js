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
          beneficiaryId: '0001',
          refereeId: '1002',
          caseId: '20002',
          requestType: requestTypeEnum.cookedFood,
          fulfilment: fulfilmentTypeEnum.inKindDonation,
          POC: 'Techladies',
          amountRequested: '450.03',
          description: 'due to debt',
          caseStatus: caseStatusTypeEnum.new,
          referenceStatus: referenceStatusTypeEnum.unverified,
          approval: approvalTypeEnum.NIL,
          amountGranted: '450.03',
        },
      ]);
    });
};

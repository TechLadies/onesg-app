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
          beneficiaryId: 'B202011-0001',
          refereeId: 'R202011-0001',
          caseId: 'EF2020-110001',
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

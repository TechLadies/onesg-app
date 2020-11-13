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
          requestType: requestTypeEnum.milkFormula,
          fulfilment: fulfilmentTypeEnum.cashTransfer,
          POC: 'Sunshine Pte Ltd',
          amountRequested: '300.00',
          description: 'job loss',
          caseStatus: caseStatusTypeEnum.processing,
          referenceStatus: referenceStatusTypeEnum.verified,
          approval: approvalTypeEnum.full,
          amountGranted: '300.00',
        },
        {
          beneficiaryId: 'B202011-0002',
          refereeId: 'R202011-0002',
          caseId: 'EF2020-110002',
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
        {
          beneficiaryId: 'B202011-0003',
          refereeId: 'R202011-0001',
          caseId: 'EF2020-110003',
          requestType: requestTypeEnum.diapers,
          fulfilment: fulfilmentTypeEnum.inKindDonation,
          POC: 'Siddique Impex',
          amountRequested: '200',
          description: 'investment failed',
          caseStatus: caseStatusTypeEnum.new,
          referenceStatus: referenceStatusTypeEnum.unverified,
          approval: approvalTypeEnum.NIL,
          amountGranted: '200',
        },
        {
          beneficiaryId: 'B202011-0001',
          refereeId: 'R202011-0001',
          caseId: 'EF2020-110004',
          requestType: requestTypeEnum.diapers,
          fulfilment: fulfilmentTypeEnum.cashTransfer,
          POC: 'Techladies',
          amountRequested: '345',
          description: 'job loss',
          caseStatus: caseStatusTypeEnum.new,
          referenceStatus: referenceStatusTypeEnum.verified,
          approval: approvalTypeEnum.NIL,
          amountGranted: '200',
        },
      ]);
    });
};

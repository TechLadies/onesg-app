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
    })
    .then(function updateCaseEF202011001() {
      return knex
        .table(tableCase)
        .where({ caseNumber: 'EF2020-11001' })
        .update({
          documents: JSON.stringify([
            { title: 'Application form', url: 'http://www.link.com' },
            { title: 'Receipt', url: 'http://www.receipt.com' },
          ]),
        });
    });
};
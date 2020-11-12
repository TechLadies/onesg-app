const { tableCase } = require('../src/models/case');

exports.seed = function seedCaseTable(knex) {
  // Deletes ALL existing entries
  return knex(tableCase)
    .del()
    .then(function insertCases() {
      // Inserts seed entries
      return knex(tableCase).insert([
        {
<<<<<<< HEAD
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
=======
<<<<<<< HEAD
          beneficiaryId: '0001',
          refereeId: '0001',
          caseId: '20002',
          requestType: RequestTypeEnum.CookedFood,
          fulfilment: FulfilmentTypeEnum.InKindDonation,
=======
          beneficiaryId: 'B202011-0001',
          refereeId: 'R202011-0001',
          caseId: 'EF2020-110001',
          requestType: requestTypeEnum.cookedFood,
          fulfilment: fulfilmentTypeEnum.inKindDonation,
>>>>>>> cleaned migration files and change created_at to id in idgenerator
          POC: 'Techladies',
          amountRequested: '450.03',
          description: 'due to debt',
          caseStatus: CaseStatusTypeEnum.New,
          referenceStatus: ReferenceStatusTypeEnum.Unverified,
          approval: ApprovalTypeEnum.NIL,
          amountGranted: '450.03',
>>>>>>> cleaned migration files and change created_at to id in idgenerator
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

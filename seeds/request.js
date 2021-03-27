const { tableRequest } = require('../src/models/request.js');

exports.seed = function seedRequestTable(knex) {
  // Deletes ALL existing entries
  return knex(tableRequest)
    .del()
    .then(function insertRequests() {
      // Inserts seed entries
      return knex(tableRequest).insert([
        {
          caseId: 1,
          requestTypeId: '1',
          fulfilmentType: 'IN_KIND_DONATION',
          completedFulfilmentItems: [
            'ITEMS_PURCHASED',
            'PURCHASE_AND_REIMBURSEMENT',
            'REIMBURSEMENT_PAID',
            'DELIVERED_TO_BENEFICIARY',
          ],
          description: 'Food for 1 week',
          requestStatus: 'ACCEPTED',
          reviewedOn: '2010-02-08',
          fulfilledOn: '2010-02-15',
        },
        {
          caseId: 1,
          requestTypeId: '2',
          fulfilmentType: 'IN_KIND_DONATION',
          completedFulfilmentItems: [
            'ITEMS_PURCHASED',
            'PURCHASE_AND_REIMBURSEMENT',
            'REIMBURSEMENT_PAID',
            'DELIVERED_TO_BENEFICIARY',
          ],
          description: 'Diapers for 6-month old baby',
          requestStatus: 'ACCEPTED',
          reviewedOn: '2010-02-08',
          fulfilledOn: '2010-02-15',
        },
        {
          caseId: 2,
          requestTypeId: '3',
          fulfilmentType: 'PARTNER_REFERRAL',
          completedFulfilmentItems: ['REFERRED_TO_PARTNER'],
          description: 'Financial assistance to pay off debt',
          requestStatus: 'REJECTED',
          reviewedOn: '2020-08-20',
        },
        {
          caseId: 2,
          requestTypeId: '5',
          fulfilmentType: 'PARTNER_REFERRAL',
          completedFulfilmentItems: ['REFERRED_TO_PARTNER'],
          description: "1 month's supply of milk formula for a 2yo child",
          requestStatus: 'ACCEPTED',
          reviewedOn: '2020-08-20',
        },
        {
          caseId: 3,
          requestTypeId: '1',
          fulfilmentType: 'PARTNER_REFERRAL',
          completedFulfilmentItems: ['REFERRED_TO_PARTNER'],
          description: 'School lunch',
          requestStatus: 'UNDER_REVIEW',
        },
        {
          caseId: 4,
          requestTypeId: '1',
          fulfilmentType: 'THIRD_PARTY_PAYMENT',
          description: 'Hot dinner',
          requestStatus: 'UNDER_REVIEW',
        },
        {
          caseId: 5,
          requestTypeId: '7',
          fulfilmentType: 'CASH_TRANSFER',
          description: 'Transportation Allowance',
          requestStatus: 'UNDER_REVIEW',
        },
        {
          caseId: 6,
          requestTypeId: '4',
          fulfilmentType: 'THIRD_PARTY_PAYMENT',
          description: 'GP consultation + medicine',
          requestStatus: 'UNDER_REVIEW',
        },
      ]);
    });
};

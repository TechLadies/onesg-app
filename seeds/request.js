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
          description: 'Donation',
          requestStatus: 'ACCEPTED',
          reviewedOn: '2020-11-04',
          fulfilledOn: '2020-11-04',
        },
        {
          caseId: 2,
          requestTypeId: '2',
          fulfilmentType: 'PARTNER_REFERRAL',
          completedFulfilmentItems: ['REFERRED_TO_PARTNER'],
          description: 'Referred cooked food',
          requestStatus: 'REJECTED',
        },
      ]);
    });
};

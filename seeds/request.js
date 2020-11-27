const {
  fulfilmentChecklistEnum,
  tableRequest,
} = require('../src/models/request.js');

exports.seed = function seedRequestTable(knex) {
  // Deletes ALL existing entries
  return knex(tableRequest)
    .del()
    .then(function insertRequests() {
      // Inserts seed entries
      return knex(tableRequest).insert([
        {
          caseId: 'EF2020-11001',
          requestTypeId: '1',
          fulfilmentType: 'IN_KIND_DONATION',
          completedFulfilmentItems: fulfilmentChecklistEnum[0],
          description: 'Donation',
          requestStatus: 'ACCEPT',
          reviewedOn: '2020-11-04',
          fulfilledOn: '2020-11-04',
        },
        {
          caseId: 'EF2020-11002',
          requestTypeId: '2',
          fulfilmentType: 'PARTNER_REFERRAL',
          completedFulfilmentItems: ['REFERRED_TO_PARTNER'],
          description: 'Referred cooked food',
          requestStatus: 'REJECT',
          reviewedOn: '2020-11-03',
          fulfilledOn: '2020-11-05',
        },
      ]);
    });
};

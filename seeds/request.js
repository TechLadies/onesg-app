const { tableRequest } = require('../src/models/request.js');
const {
  fulfilmentTypeEnum,
  fulfilmentChecklistEnum,
  requestStatusEnum,
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
          fulfilmentType: fulfilmentTypeEnum.inKindDonation,
          completedFulfilmentItems: fulfilmentChecklistEnum.inKindDonation,
          description: 'Donation',
          requestStatus: requestStatusEnum.accept,
          reviewedOn: '2020-11-04',
          fulfilledOn: '2020-11-04',
        },
        {
          caseId: 'EF2020-11002',
          requestTypeId: '2',
          fulfilmentType: fulfilmentTypeEnum.partnerReferral,
          completedFulfilmentItems: fulfilmentChecklistEnum.partnerReferral,
          description: 'Referred cooked food',
          requestStatus: requestStatusEnum.reject,
          reviewedOn: '2020-11-03',
          fulfilledOn: '2020-11-05',
        },
      ]);
    });
};

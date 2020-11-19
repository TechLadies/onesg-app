const { tableRequest } = require('../src/models/request.js');
const {
  fulfilmentTypeEnum,
  fulfilmentChecklistArray,
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
          fulfilmentChecklist: fulfilmentChecklistArray[0],
          description: 'Donation',
          requestStatus: requestStatusEnum.accept,
          approvedOn: '2020-11-04',
          completedOn: '2020-11-04',
        },
        {
          caseId: 'EF2020-11002',
          requestTypeId: '2',
          fulfilmentType: fulfilmentTypeEnum.partnerReferral,
          fulfilmentChecklist: fulfilmentChecklistArray[1],
          description: 'Referred cooked food',
          requestStatus: requestStatusEnum.reject,
          approvedOn: '2020-11-03',
          completedOn: '2020-11-05',
        },
      ]);
    });
};

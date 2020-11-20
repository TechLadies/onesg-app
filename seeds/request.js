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
          fulfilmentChecklist:
            '{"ITEMS_PURCHASED","PURCHASE_AND_REIMBURSEMENT"}',
          description: 'Donation',
          requestStatus: requestStatusEnum.accept,
          approvedOn: '2020-11-04',
          completedOn: '2020-11-04',
        },
        {
          caseId: 'EF2020-11002',
          requestTypeId: '2',
          fulfilmentType: fulfilmentTypeEnum.partnerReferral,
          fulfilmentChecklist: Object.values(fulfilmentChecklistEnum[1]), // fulfilmentChecklistArray[1].fulfilmentChecklist
          description: 'Referred cooked food',
          requestStatus: requestStatusEnum.reject,
          approvedOn: '2020-11-03',
          completedOn: '2020-11-05',
        },
      ]);
    });
};

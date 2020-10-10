/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
const {tableCase} = require('../src/models/case')
const {
  RequestTypeEnum,
  FulfilmentTypeEnum,
  CaseStatusTypeEnum,
  ReferenceStatusTypeEnum,
  ApprovalTypeEnum,
} = require('../src/models/case.js')


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableCase)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableCase).insert([
        {
          CaseId: '20002',
          RequestType: RequestTypeEnum.CookedFood,
          Fulfilment: FulfilmentTypeEnum.InKindDonation,
          Description: 'due to debt',
          CaseStatus: CaseStatusTypeEnum.New,
          ReferenceStatus:ReferenceStatusTypeEnum.Unverified,
          Approval: ApprovalTypeEnum.NIL,
          AmountGranted: '450.03',
          BeneficiaryId: '0001',
          RefereeId: '1002',
        },
      ])
    })
}

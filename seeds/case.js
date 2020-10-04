/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
const {tableCase} = require('../src/models/case')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableCase)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableCase).insert([
        {
          CaseId: '20002',
          RequestType: 'Cooked Food',
          Fulfilment: 'Cash Transfer',
          Description: 'due to debt',
          CaseStatus: 'New',
          ReferenceStatus: 'Unverified',
          Approval: 'Partial',
          AmountGranted: '450.03',
          BeneficiaryId: '0001',
          RefereeId: '1002',
        },
      ])
    })
}

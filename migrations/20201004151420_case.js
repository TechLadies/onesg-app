/* eslint-disable func-names */
/* eslint-disable no-sequences */
const { tableCase } = require('../src/models/case.js')

exports.up = function (knex) {
  return knex.schema.createTable(tableCase, (table) => {
    table.increments('CaseId').primary()
    // eslint-disable-next-line no-unused-expressions
    table.enum('RequestType', [
      'Cooked Food',
      'Diapers',
      'Financial Assistance',
      'Medical Bill',
      'Milk Formula',
      'School Fees',
      'Transportation Fees',
      'Utility Bill',
    ]),
      table.enum('Fulfilment', [
        'In-Kind Donation',
        'Cash Transfer',
        'Third-Party Payment',
        'Partner Referral',
      ]),
      table.text('Description'),
      table.enum('CaseStatus', [
        'New',
        'On Hold',
        'Referred to EFC',
        'Processing',
        'Closed',
      ]),
      table.enum('ReferenceStatus', ['Unverified', 'Pending', 'Verified']),
      table.enum('Approval', ['-', 'Full', 'Partial', 'Rejected']),
      table.decimal('AmountGranted'),
      table.integer('BeneficiaryId').unique(),
      table.integer('RefereeId').unique(),
      table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(tableCase)
}

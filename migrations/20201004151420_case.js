/* eslint-disable func-names */
/* eslint-disable no-sequences */
const { tableCase } = require('../src/models/case.js')

exports.up = function (knex) {
  return knex.schema.createTable(tableCase, (table) => {
    table.increments('CaseId').primary()
    // eslint-disable-next-line no-unused-expressions
    table.enum('RequestType', [
      'cookedFood',
      'diapers',
      'financialAssistance',
      'medicalBill',
      'milkFormula',
      'schoolFees',
      'transportationFees',
      'utilityBill',
    ]),
      table.enum('Fulfilment', [
        'inKindDonation',
        'cashTransfer',
        'third-partyPayment',
        'partnerReferral',
      ]),
      table.text('Description'),
      table.enum('CaseStatus', [
        'new',
        'onHold',
        'referredtoEFC',
        'processing',
        'closed',
      ]),
      table.enum('ReferenceStatus', ['unverified', 'pending', 'verified']),
      table.enum('Approval', ['-', 'full', 'partial', 'rejected']),
      table.decimal('AmountGranted'),
      table.integer('BeneficiaryId').unique(),
      table.integer('RefereeId').unique(),
      table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(tableCase)
}

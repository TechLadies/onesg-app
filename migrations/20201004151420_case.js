const { tableCase } = require('../src/models/case.js')
const { tableUser } = require('../src/models/user.js')
const { tableReferee } = require('../src/models/referee.js')
const {
  RequestTypeEnum,
  FulfilmentTypeEnum,
  CaseStatusTypeEnum,
  ReferenceStatusTypeEnum,
  ApprovalTypeEnum,
} = require('../src/models/case.js')

exports.up = function makeCasetable(knex) {
  return knex.schema.createTable(tableCase, (table) => {
    table.increments('CaseId').primary()
    table.enum('RequestType', Object.values(RequestTypeEnum))
    table.enum('Fulfilment', Object.values(FulfilmentTypeEnum))
    table.text('Description')
    table.enum('CaseStatus', Object.values(CaseStatusTypeEnum))
    table.enum('Approval', Object.values(ApprovalTypeEnum))
    table.enum('ReferenceStatus', Object.values(ReferenceStatusTypeEnum))
    table.decimal('AmountGranted')
    table
      .bigInteger('BeneficiaryId')
      .unsigned()
      .index()
      .references('BeneficiaryId')
      .inTable(tableUser)
    table
      .bigInteger('RefereeId')
      .unsigned()
      .index()
      .references('RefereeId')
      .inTable(tableReferee)
    table.timestamps(true, true)
  })
}

exports.down = function exportCasetable(knex) {
  return knex.schema.dropTable(tableCase)
}

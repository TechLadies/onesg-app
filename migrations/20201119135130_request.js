const { tableCase } = require('../src/models/case.js');
const {
  fulfilmentTypeEnum,
  requestStatusEnum,
  tableRequest,
} = require('../src/models/request.js');
const { tableRequestType } = require('../src/models/requestType.js');

exports.up = function makeRequestTable(knex) {
  return knex.schema.createTable(tableRequest, (table) => {
    table.increments('id').primary().index();
    table
      .integer('requestTypeId')
      .unsigned()
      .references('id')
      .inTable(tableRequestType)
      .comment('Type of request');
    table.enum('fulfilmentType', fulfilmentTypeEnum);
    table
      .specificType('completedFulfilmentItems', 'text[]')
      .comment(
        'Lists items that have been checked off from the fulfilment type checklist; each type has its own checklist'
      );
    table.string('description', 255).comment('Description of the request');
    table.enum('requestStatus', requestStatusEnum).defaultTo('UNDER_REVIEW');
    table
      .date('reviewedOn')
      .comment('Date the request has been accepted or rejected');
    table
      .date('fulfilledOn')
      .comment(
        'Date the request has completed; Completed when all fulfilment checklist items have been checked off'
      );
    table
      .integer('caseId')
      .references('id')
      .inTable(tableCase)
      .comment('Case this request belongs to');
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .comment('Date of case creation');
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .comment('Date of case update');
  });
};

exports.down = function exportRequestTable(knex) {
  return knex.schema.dropTable(tableRequest);
};

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
      .string('caseId', 12)
      .references('caseId')
      .inTable(tableCase)
      .comment('Case id that is related to this request');
    table
      .integer('requestTypeId')
      .unsigned()
      .references('id')
      .inTable(tableRequestType)
      .comment('Request type id');
    table
      .enum('fulfilmentType', fulfilmentTypeEnum)
      .comment(
        'Fulfilment type: in kind donation, partner referral, third party payment or cash transfer'
      );
    table
      .specificType('completedFulfilmentItems', 'text[]')
      .comment('Checklist based on each fulfilment type');
    table.text('description').comment('Description of the request');
    table
      .enum('requestStatus', requestStatusEnum)
      .comment('Status of request: accepted, rejected, under review');
    table.date('reviewedOn').comment('Date of request review');
    table.date('fulfilledOn').comment('Date of request fulfilment');
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

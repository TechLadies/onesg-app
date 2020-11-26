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
      .unsigned()
      .index()
      .references('caseId')
      .inTable(tableCase);
    table
      .integer('requestTypeId')
      .unsigned()
      .index()
      .references('id')
      .inTable(tableRequestType);
    table.enum('fulfilmentType', fulfilmentTypeEnum);
    table.specificType('completedFulfilmentItems', 'json[]');
    table.text('description');
    table.enum('requestStatus', requestStatusEnum);
    table.date('reviewedOn');
    table.date('fulfilledOn');
  });
};

exports.down = function exportRequestTable(knex) {
  return knex.schema.dropTable(tableRequest);
};

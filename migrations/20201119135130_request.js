const { tableCase } = require('../src/models/case.js');
const { tableRequest } = require('../src/models/request.js');
const { tableRequestType } = require('../src/models/requestType.js');

const {
  fulfilmentTypeEnum,
  fulfilmentChecklistEnum,
  requestStatusEnum,
} = require('../src/models/request.js');

exports.up = function makeRequestTable(knex) {
  return knex.schema.createTable(tableRequest, (table) => {
    table.increments('id').primary().index();
    table
      .string('caseId')
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
    table.enum('fulfilmentType', Object.values(fulfilmentTypeEnum));
    table.text('fulfilmentChecklist', Object.values(fulfilmentChecklistEnum));
    table.text('description');
    table.enum('requestStatus', Object.values(requestStatusEnum));
    table.date('approvedOn');
    table.date('completedOn');
  });
};

exports.down = function exportRequestTable(knex) {
  return knex.schema.dropTable(tableRequest);
};

const { tableCase } = require('../src/models/case.js');
const { tableRequest } = require('../src/models/request.js');
const { tableRequestType } = require('../src/models/requestType.js');

const {
  fulfilmentTypeEnum,
  requestStatusEnum,
} = require('../src/models/request.js');

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
    table.enum('fulfilmentType', Object.values(fulfilmentTypeEnum));
    table.string('completedFulfilmentItems');
    table.text('description');
    table.enum('requestStatus', Object.values(requestStatusEnum));
    table.date('reviewedOn');
    table.date('fulfilledOn');
  });
};

exports.down = function exportRequestTable(knex) {
  return knex.schema.dropTable(tableRequest);
};

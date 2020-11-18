const { tableCase } = require('../src/models/case.js');
const { tableRequest } = require('../src/models/request.js');
const {
  fulfilmentTypeEnum,
  requestStatusEnum,
} = require('../src/models/request.js');

exports.up = function exportRequestTable(knex) {
  return knex.schema.createTable(tableRequest, (table) => {
    table.increments('id').primary().index();
    table
      .string('caseId')
      .unsigned()
      .index()
      .references('caseId')
      .inTable(tableCase);
    table.integer('requestTypeId');
    //   .unsigned()
    //   .index()
    //   .references('caseId')
    //   .inTable(tableCase);
    table.enum('fulfilmentType', Object.values(fulfilmentTypeEnum));
    table.text('fulfilmentChecklist'); // , Object.values();
    table.text('description');
    table.enum('requestStatus', Object.values(requestStatusEnum));
    table.date('approvedOn');
    table.date('completedOn');
  });
};

exports.down = function exportRequestTable(knex) {
  return knex.schema.dropTable(tableRequest);
};

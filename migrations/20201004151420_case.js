const { tableCase } = require('../src/models/case.js');
const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { tableReferee } = require('../src/models/referee.js');
const {
  requestTypeEnum,
  fulfilmentTypeEnum,
  caseStatusTypeEnum,
  referenceStatusTypeEnum,
  approvalTypeEnum,
} = require('../src/models/case.js');

exports.up = function makeCasetable(knex) {
  return knex.schema.createTable(tableCase, (table) => {
    table.increments('caseId').primary();
    table.enum('requestType', Object.values(requestTypeEnum));
    table.enum('fulfilment', Object.values(fulfilmentTypeEnum));
    table.text('POC');
    table.decimal('amountRequested');
    table.text('description');
    table.enum('caseStatus', Object.values(caseStatusTypeEnum));
    table.enum('approval', Object.values(approvalTypeEnum));
    table.enum('referenceStatus', Object.values(referenceStatusTypeEnum));
    table.decimal('amountGranted');
    table
      .integer('beneficiaryId')
      .unsigned()
      .index()
      .references('benId')
      .inTable(tableBeneficiary);
    table
      .bigInteger('refereeId')
      .unsigned()
      .index()
      .references('refereeId')
      .inTable(tableReferee);
    table.timestamps(true, true);
  });
};

exports.down = function exportCasetable(knex) {
  return knex.schema.dropTable(tableCase);
};

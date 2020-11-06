const { tableCase } = require('../src/models/case.js');
const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { tableReferee } = require('../src/models/referee.js');
const {
  RequestTypeEnum,
  FulfilmentTypeEnum,
  CaseStatusTypeEnum,
  ReferenceStatusTypeEnum,
  ApprovalTypeEnum,
} = require('../src/models/case.js');

exports.up = function makeCasetable(knex) {
  return knex.schema.createTable(tableCase, (table) => {
    table.increments('caseId').primary();
    table.enum('requestType', Object.values(RequestTypeEnum));
    table.enum('fulfilment', Object.values(FulfilmentTypeEnum));
    table.text('POC');
    table.decimal('amountRequested');
    table.text('description');
    table.enum('caseStatus', Object.values(CaseStatusTypeEnum));
    table.enum('approval', Object.values(ApprovalTypeEnum));
    table.enum('referenceStatus', Object.values(ReferenceStatusTypeEnum));
    table.decimal('amountGranted');
    table
      .integer('beneficiaryId')
      .unsigned()
      .index()
      .references('benId')
      .inTable(tableBeneficiary);
    table
      .integer('refereeId')
      .unsigned()
      .index()
      .references('refId')
      .inTable(tableReferee);
    table.timestamps(true, true);
  });
};

exports.down = function exportCasetable(knex) {
  return knex.schema.dropTable(tableCase);
};

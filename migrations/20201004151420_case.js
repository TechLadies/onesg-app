const { tableCase } = require('../src/models/case.js');
const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { tableReferee } = require('../src/models/referee.js');
const {
  caseStatusEnum,
  referenceStatusEnum,
} = require('../src/models/case.js');

exports.up = function makeCasetable(knex) {
  return knex.schema.createTable(tableCase, (table) => {
    table.increments('caseId').primary();
    table.string('caseStatus', Object.values(caseStatusEnum));
    table.date('appliedOn');
    table.text('pointOfContact');
    table.enum('referenceStatus', Object.values(referenceStatusEnum));
    table.string('pendingStatusReason');
    table.decimal('amountRequested').notNullable();
    table.decimal('amountGranted');
    table.specificType('documents', 'text ARRAY');
    table
      .integer('beneficiaryId')
      .unsigned()
      .index()
      .references('id')
      .inTable(tableBeneficiary);
    table
      .integer('refereeId')
      .unsigned()
      .index()
      .references('id')
      .inTable(tableReferee);
    table.integer('createdBy');
    table.integer('updatedBy');
    table.timestamps(true, true);
  });
};

exports.down = function exportCasetable(knex) {
  return knex.schema.dropTable(tableCase);
};

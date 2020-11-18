const { tableCase } = require('../src/models/case.js');
const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { tableReferee } = require('../src/models/referee.js');
// const {
//   RequestTypeEnum,
//   FulfilmentTypeEnum,
//   CaseStatusTypeEnum,
//   ReferenceStatusTypeEnum,
//   ApprovalTypeEnum,
// } = require('../src/models/case.js');

exports.up = function makeCasetable(knex) {
  return knex.schema
    .createTable(tableCase, (table) => {
      table.increments('caseId').primary();
      table.date('appliedOn');
      table.text('pointOfContact');
      table.enum('referenceStatus'); // Object.values(referenceStatus)
      table.text('pendingStatusReason');
      table.decimal('amountRequested').notNullable();
      table.decimal('amountGranted');
      table.array('documents');
      table
        .integer('beneficiaryId')
        .unsigned()
        .index()
        .references('id')
        .inTable(tableBeneficiary);
      table
        .bigInteger('refereeId')
        .unsigned()
        .index()
        .references('id')
        .inTable(tableReferee);
      table.integer('createdBy');
      table.integer('updatedBy');
      table.timestamps(true, true);
    })
    .raw(
      'ALTER TABLE `tableCase` RENAME COLUMN created_at TO createdAt',
      'ALTER TABLE `tableCase` RENAME COLUMN updated_at TO updatedAt'
    );
};

exports.down = function exportCasetable(knex) {
  return knex.schema.dropTable(tableCase);
};

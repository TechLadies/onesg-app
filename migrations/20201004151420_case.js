const { tableCase } = require('../src/models/case.js');
const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { tableReferee } = require('../src/models/referee.js');
const {
  caseStatusEnum,
  referenceStatusEnum,
} = require('../src/models/case.js');

exports.up = function makeCasetable(knex) {
  return knex.schema.createTable(tableCase, (table) => {
    table.string('caseId').primary().index().unique();
    table.string('caseStatus', Object.values(caseStatusEnum));
    table.date('appliedOn');
    table.text('pointOfContact');
    table.enum('referenceStatus', Object.values(referenceStatusEnum));
    table.string('pendingStatusReason');
    table.decimal('amountRequested').notNullable();
    table.decimal('amountGranted');
    table.specificType('documents', 'text ARRAY');
    table
      .string('beneficiaryId')
      .unsigned()
      .index()
      .references('beneficiaryId')
      .inTable(tableBeneficiary);
    table
      .string('refereeId')
      .unsigned()
      .index()
      .references('refereeId')
      .inTable(tableReferee);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.integer('createdBy');
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.integer('updatedBy');
  });
};

exports.down = function exportCasetable(knex) {
  return knex.schema.dropTable(tableCase);
};

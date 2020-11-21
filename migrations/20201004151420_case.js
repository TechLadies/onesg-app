const { tableCase } = require('../src/models/case.js');
const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { tableReferee } = require('../src/models/referee.js');
const {
  caseStatusEnum,
  referenceStatusEnum,
} = require('../src/models/case.js');

exports.up = function makeCasetable(knex) {
  return knex.schema.createTable(tableCase, (table) => {
    table.string('caseId', 12).primary().index().unique();
    table.enum('caseStatus', Object.values(caseStatusEnum)).defaultTo('NEW');
    table.date('appliedOn');
    table.string('pointOfContact');
    table
      .enum('referenceStatus', Object.values(referenceStatusEnum))
      .defaultTo('UNVERIFIED');
    table.string('casePendingReason');
    table.decimal('amountRequested').notNullable();
    table.decimal('amountGranted');
    table.specificType('documents', 'json[]');
    table
      .string('beneficiaryId', 11)
      .unsigned()
      .index()
      .references('beneficiaryId')
      .inTable(tableBeneficiary);
    table
      .string('refereeId', 11)
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

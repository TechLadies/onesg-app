const { tableCase } = require('../src/models/case.js');
const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { tableReferee } = require('../src/models/referee.js');
const { tableStaff } = require('../src/models/staff.js');
const {
  caseStatusEnum,
  referenceStatusEnum,
} = require('../src/models/case.js');

exports.up = function makeCasetable(knex) {
  return knex.schema.createTable(tableCase, (table) => {
    table.dropPrimary();
    table.increments('id').index();
    table.string('caseId', 12).primary().unique();
    table.enum('caseStatus', caseStatusEnum).defaultTo('NEW');
    table.date('appliedOn').defaultTo(knex.fn.now());
    table.string('pointOfContact');
    table.enum('referenceStatus', referenceStatusEnum).defaultTo('UNVERIFIED');
    table.string('casePendingReason', 255);
    table.decimal('amountRequested').notNullable();
    table.decimal('amountGranted');
    table.jsonb('documents');
    table
      .string('beneficiaryId', 11)
      .references('beneficiaryId')
      .inTable(tableBeneficiary);
    table.string('refereeId', 11).references('refereeId').inTable(tableReferee);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.integer('createdBy').unsigned().references('id').inTable(tableStaff);
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.integer('updatedBy').unsigned().references('id').inTable(tableStaff);
  });
};

exports.down = function exportCasetable(knex) {
  return knex.schema.dropTable(tableCase);
};

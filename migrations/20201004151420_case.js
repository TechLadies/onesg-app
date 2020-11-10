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
    table.increments('id').primary();
    table
      .string('caseNumber', 12)
      .index()
      .unique()
      .comment('Case number for this case. Format: EFYYYY-MM999');
    table.enum('caseStatus', caseStatusEnum).defaultTo('NEW');
    table
      .date('appliedOn')
      .defaultTo(knex.fn.now())
      .comment('Application date of case');
    table.string('pointOfContact', 100).comment('Point of contact from OneSG');
    table.enum('referenceStatus', referenceStatusEnum).defaultTo('UNVERIFIED');
    table
      .string('casePendingReason', 255)
      .comment('Reason the case is/was pending');
    table.decimal('amountRequested').notNullable();
    table.decimal('amountGranted').defaultTo(0.0);
    table.jsonb('documents').comment('Supporting document(s) for this case');
    table
      .integer('beneficiaryId')
      .references('id')
      .inTable(tableBeneficiary)
      .notNullable()
      .unsigned()
<<<<<<< HEAD
      .comment('Beneficiary id that is related to this case');
    table
      .integer('refereeId')
      .references('id')
      .inTable(tableReferee)
=======
      .index()
      .references('id')
      .inTable(tableBeneficiary);
    table
      .integer('refereeId')
>>>>>>> change benId to id, hide benId from client
      .unsigned()
      .comment('Referee id that is related to this case');
    table
      .integer('createdBy')
      .references('id')
      .inTable(tableStaff)
      .unsigned()
      .notNullable()
      .comment('OneSG staff who created this case');
    table
      .integer('updatedBy')
      .references('id')
      .inTable(tableStaff)
      .unsigned()
      .notNullable()
      .comment('OneSG staff who updated this case');
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .comment('Date of case creation');
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .comment('Date of case update');
  });
};

exports.down = function exportCasetable(knex) {
  return knex.schema.dropTable(tableCase);
};

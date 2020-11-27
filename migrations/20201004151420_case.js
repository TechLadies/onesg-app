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
    table
      .string('caseId', 12)
      .primary()
      .unique()
      .comment('Case id for this case');
    table
      .enum('caseStatus', caseStatusEnum)
      .defaultTo('NEW')
      .comment('Status of case: new, pending, referred, processed or closed');
    table
      .date('appliedOn')
      .defaultTo(knex.fn.now())
      .comment('Application date of case');
    table.string('pointOfContact').comment('Point of contact from OneSG');
    table
      .enum('referenceStatus', referenceStatusEnum)
      .defaultTo('UNVERIFIED')
      .comment('Status of reference: unverified, pending or verified');
    table.string('casePendingReason', 255).comment('Reason if case is pending');
    table.decimal('amountRequested').notNullable().comment('Amount requested');
    table.decimal('amountGranted').defaultTo('0').comment('Amount granted');
    table.jsonb('documents').comment('Supporting document(s) for the case');
    table
      .string('beneficiaryId', 11)
      .references('beneficiaryId')
      .inTable(tableBeneficiary)
      .notNullable()
      .comment('Beneficiary id that is related to this case');
    table
      .string('refereeId', 11)
      .references('refereeId')
      .inTable(tableReferee)
      .comment('Referee id that is related to this case');
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .comment('Date of case creation');
    table
      .integer('createdBy')
      .unsigned()
      .references('id')
      .inTable(tableStaff)
      .comment('OneSG staff who created this case');
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .comment('Date of case update');
    table
      .integer('updatedBy')
      .unsigned()
      .references('id')
      .inTable(tableStaff)
      .comment('OneSG staff who updated this case');
  });
};

exports.down = function exportCasetable(knex) {
  return knex.schema.dropTable(tableCase);
};

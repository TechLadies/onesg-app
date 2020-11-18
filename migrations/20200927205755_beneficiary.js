const {
  // eslint-disable-next-line no-unused-vars
  paymentTypeEnum,
  tableBeneficiary,
} = require('../src/models/beneficiary.js');
const { tableStaff } = require('../src/models/staff.js');

exports.up = function makeBeneficiarytable(knex) {
  return knex.schema.createTable(tableBeneficiary, (table) => {
    table.increments('id').primary();
<<<<<<< HEAD
    table
      .string('beneficiaryNumber', 11)
      .index()
      .unique()
      .comment('Format: BYYYY-MM999');
    table.string('name', 100).notNullable();
    table.string('email', 50).notNullable().unique();
    table.string('phone', 8).notNullable().unique();
    table.string('address', 255);
    table.string('occupation', 50);
=======
    table.string('beneficiaryId').index().unique();
    table.string('name').index();
    table.string('email').unique();
    table.string('phone').unique();
    table.text('notes');
    table.string('occupation');
>>>>>>> update: add notes & revised search
    table.decimal('householdIncome');
    table.specificType('householdSize', 'smallint').unsigned();
    table.specificType('paymentType', 'text[]');
    table
      .text('notes')
      .comment('Additional information related to this beneficiary');
    table
      .integer('createdBy')
      .references('id')
      .inTable(tableStaff)
      .unsigned()
      .notNullable()
      .comment('OneSG staff who created this beneficiary');
    table
      .integer('updatedBy')
      .references('id')
      .inTable(tableStaff)
      .unsigned()
      .notNullable()
      .comment('OneSG staff who updated this beneficiary');
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .comment('Date of beneficiary creation');
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .comment('Date of beneficiary update');

  })
}

exports.down = function exportBeneficiarytable(knex) {
  return knex.schema.dropTable(tableBeneficiary);
};
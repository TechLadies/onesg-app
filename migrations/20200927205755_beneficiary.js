const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { PaymentTypeEnum } = require('../src/models/beneficiary.js');

exports.up = function makeBeneficiarytable(knex) {
  return knex.schema.createTable(tableBeneficiary, (table) => {
    table.increments('id').primary();
    table.string('beneficiaryId').index().unique();
    table.string('name');
    table.string('email').notNullable().unique();
    table.string('phone').notNullable().unique();
    table.text('address');
    table.string('occupation');
    table.decimal('householdIncome');
    table.integer('householdSize');
    table.enum('paymentType', Object.values(PaymentTypeEnum));
    table.text('notes');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function exportBeneficiarytable(knex) {
  return knex.schema.dropTable(tableBeneficiary);
};

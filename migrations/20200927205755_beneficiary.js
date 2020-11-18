const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { PaymentTypeEnum } = require('../src/models/beneficiary.js');

exports.up = function makeBeneficiarytable(knex) {
  return knex.schema.createTable(tableBeneficiary, (table) => {
    table.increments('id').primary();
    table.string('beneficiaryId').index();
    table.text('name');
    table.text('email').notNullable().unique();
    table.text('phone').notNullable().unique();
    table.text('address');
    table.text('occupation');
    table.decimal('householdIncome');
    table.integer('householdSize');
    table.enum('paymentType', Object.values(PaymentTypeEnum));
    table.timestamps(true, true);
  });
};

exports.down = function exportBeneficiarytable(knex) {
  return knex.schema.dropTable(tableBeneficiary);
};

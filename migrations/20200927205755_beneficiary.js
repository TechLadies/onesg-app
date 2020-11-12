const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { paymentTypeEnum } = require('../src/models/beneficiary.js');

exports.up = function makeBeneficiarytable(knex) {
  return knex.schema.createTable(tableBeneficiary, (table) => {
    table.increments('id').primary();
    table.string('beneficiaryId').index().unique();
    table.string('name').index();
    table.string('email').unique();
    table.string('phone').unique();
    table.string('occupation');
    table.decimal('householdIncome');
    table.integer('householdSize');
    table.enum('paymentType', Object.values(paymentTypeEnum));
    table.timestamps(true, true);
  });
};

exports.down = function exportBeneficiarytable(knex) {
  return knex.schema.dropTable(tableBeneficiary);
};

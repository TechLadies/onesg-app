const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { PaymentTypeEnum } = require('../src/models/beneficiary.js');

exports.up = function makeBeneficiarytable(knex) {
  return knex.schema.createTable(tableBeneficiary, (table) => {
    table.varchar('BeneficiaryId').primary();
    table.string('Name').index();
    table.string('Email').unique();
    table.string('Phone').unique();
    table.string('Occupation');
    table.decimal('HouseholdIncome');
    table.integer('HouseholdSize');
    table.enum('PaymentType', Object.values(PaymentTypeEnum));
    table.timestamps(true, true);
  });
};

exports.down = function exportBeneficiarytable(knex) {
  return knex.schema.dropTable(tableBeneficiary);
};

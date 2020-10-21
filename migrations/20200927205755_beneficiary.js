const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { PaymentTypeEnum } = require('../src/models/beneficiary.js');

exports.up = function makeBeneficiarytable(knex) {
  return knex.schema.createTable(tableBeneficiary, (table) => {
<<<<<<< HEAD
    table.increments('BeneficiaryId').primary();
    table.integer('RefereeId').unique();
    table.text('Name');
    table.text('Email').notNullable().unique();
    table.text('Phone').notNullable().unique();
    table.text('Address');
    table.text('Occupation');
    table.decimal('HouseholdIncome');
    table.integer('HouseholdSize');
    table.enum('PaymentType', Object.values(PaymentTypeEnum));
    table.timestamps(true, true);
  });
};
=======
    table.increments('BeneficiaryId').primary()
    table.text('Name')
    table.text('Email').notNullable().unique()
    table.text('Phone').notNullable().unique()
    table.text('Address')
    table.text('Occupation')
    table.decimal('HouseholdIncome')
    table.integer('HouseholdSize')
    table.enum('PaymentType', Object.values(PaymentTypeEnum))
    table.timestamps(true, true)
  })
}
>>>>>>> changed db to postgres & tested with referee

exports.down = function exportBeneficiarytable(knex) {
  return knex.schema.dropTable(tableBeneficiary);
};

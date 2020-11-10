const { tableBeneficiary } = require('../src/models/beneficiary');
const { paymentTypeEnum } = require('../src/models/beneficiary.js');

exports.seed = function seedBeneficiaryTable(knex) {
  // Deletes ALL existing entries
  return knex(tableBeneficiary)
    .del()
    .then(function insertBeneficiaries() {
      // Inserts seed entries
      return knex(tableBeneficiary).insert([
        {
          beneficiaryId: 'B202011-0001',
          name: 'ziza',
          email: 'zizah@azizah@.com',
          phone: '596424222',
          occupation: 'software engineer',
          householdIncome: '1333',
          householdSize: '4',
          paymentType: paymentTypeEnum.payNow,
        },
      ]);
    });
};

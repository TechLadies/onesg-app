const { tableBeneficiary } = require('../src/models/beneficiary');

exports.seed = function seedBeneficiaryTable(knex) {
  // Deletes ALL existing entries
  return knex(tableBeneficiary)
    .del()
    .then(function insertBeneficiaries() {
      // Inserts seed entries
      return knex(tableBeneficiary).insert([
        {
          beneficiaryNumber: 'B2020-11001',
          name: 'Ziza',
          email: 'zizah@azizah@.com',
          phone: '96424222',
          address: '100 victoria street',
          occupation: 'software engineer',
          householdIncome: '1333',
          householdSize: '4',
          paymentType: ['PAYNOW'],
          notes: 'Repeated request',
          createdBy: 1,
          updatedBy: 1,
        },
        {
          beneficiaryNumber: 'B2020-11002',
          name: 'Alex Plus',
          email: 'alex.p22@gmail.com',
          phone: '91112222',
          address: '688 Bedok Avenue 2',
          occupation: 'Security Guard',
          householdIncome: '1875',
          householdSize: '5',
          paymentType: ['BANK_TRANSFER'],
          createdBy: 2,
          updatedBy: 1,
        },
      ]);
    });
};

const { tableBeneficiary } = require('../src/models/beneficiary');
const { PaymentTypeEnum } = require('../src/models/beneficiary.js');

exports.seed = function seedBeneficiaryTable(knex) {
  // Deletes ALL existing entries
  return knex(tableBeneficiary)
    .del()
    .then(function insertBeneficiaries() {
      // Inserts seed entries
      return knex(tableBeneficiary).insert([
        {
          beneficiaryId: 'B2020-11001',
          name: 'Ziza',
          email: 'zizah@azizah@.com',
          phone: '596424222',
          address: '100 victoria street',
          occupation: 'software engineer',
          householdIncome: '1333',
          householdSize: '4',
          paymentType: PaymentTypeEnum.PayNow,
        },
        {
          beneficiaryId: 'B2020-11002',
          name: 'Alex Plus',
          email: 'alex.p22@gmail.com',
          phone: '91112222',
          address: '688 Bedok Avenue 2',
          occupation: 'Security Guard',
          householdIncome: '1875',
          householdSize: '5',
          paymentType: PaymentTypeEnum.BankTransfer,
        },
        {
          beneficiaryId: 'B2020-11003',
          name: 'Praveen Kumar',
          email: 'praveen_k@hotmail.com.sg',
          phone: '62226222',
          address: '41 Anderson Road',
          occupation: 'Hawker',
          householdIncome: '1700',
          householdSize: '6',
          paymentType: PaymentTypeEnum.PayNow,
        },
      ]);
    });
};

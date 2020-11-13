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
          name: 'Gurmit',
          email: 'gurmit@singh.com',
          phone: '96424222',
          occupation: 'calefare actor',
          householdIncome: '1333',
          householdSize: '4',
          paymentType: paymentTypeEnum.payNow,
          created_at: '2020-11-12 15:04:31.18657+08',
        },
        {
          beneficiaryId: 'B202011-0002',
          name: 'gurindam',
          email: 'jojojuju@gmail.com',
          phone: '90093955',
          occupation: 'homemaker',
          householdIncome: '202',
          householdSize: 4,
          paymentType: paymentTypeEnum.payNow,
          created_at: '2020-11-12 15:04:32.18657+08',
        },
        {
          beneficiaryId: 'B202011-0003',
          name: 'bobby',
          email: 'famiz676@gmail.com',
          phone: '92224421',
          occupation: 'student',
          householdIncome: '1200.00',
          householdSize: 3,
          paymentType: paymentTypeEnum.bankTransfer,
          created_at: '2020-11-12 15:04:33.18657+08',
        },
        {
          beneficiaryId: 'B202011-0004',
          name: 'betty',
          email: 'familyyy@gmail.com',
          phone: '91940421',
          occupation: 'unemployed',
          householdIncome: '1000.00',
          householdSize: 3,
          paymentType: paymentTypeEnum.payNow,
          created_at: '2020-11-12 15:04:34.18657+08',
        },
        {
          beneficiaryId: 'B202011-0005',
          name: 'veronica',
          email: 'salagh@gmail.com',
          phone: '97577645',
          occupation: 'tech',
          householdIncome: '3455.00',
          householdSize: 6,
          paymentType: paymentTypeEnum.bankTransfer,
          created_at: '2020-11-12 15:04:35.18657+08',
        },
      ]);
    });
};

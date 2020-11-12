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
<<<<<<< HEAD
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
        {
          beneficiaryNumber: 'B2020-11003',
          name: 'Praveen Kumar',
          email: 'praveen_k@hotmail.com.sg',
          phone: '62226222',
          address: '41 Anderson Road',
          occupation: 'Hawker',
          householdIncome: '1700',
          householdSize: '6',
          paymentType: ['PAYNOW', 'BANK_TRANSFER'],
          createdBy: 1,
          updatedBy: 2,
=======
          paymentType: PaymentTypeEnum.PayNow,
=======
          occupation: 'software engineer',
=======
          name: 'Gurmit',
          email: 'gurmit@singh.com',
          phone: '96424222',
          occupation: 'calefare actor',
>>>>>>> add seed data
          householdIncome: '1333',
          householdSize: '4',
          paymentType: paymentTypeEnum.payNow,
<<<<<<< HEAD
>>>>>>> cleaned error & change fields to camelcase
=======
          created_at: '2020-11-12 15:04:31.18657+08',
>>>>>>> cleaned migration files and change created_at to id in idgenerator
        },
        {
          beneficiaryId: 'B202011-0002',
          name: 'veronica',
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
          name: 'gurinda',
          email: 'salagh@gmail.com',
          phone: '97577645',
          occupation: 'tech',
          householdIncome: '3455.00',
          householdSize: 6,
          paymentType: paymentTypeEnum.bankTransfer,
          created_at: '2020-11-12 15:04:35.18657+08',
>>>>>>> cleaned migration files and change created_at to id in idgenerator
        },
      ]);
    });
};

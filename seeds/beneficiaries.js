const { tableBeneficiary } = require('../src/models/beneficiary')
const { PaymentTypeEnum } = require('../src/models/beneficiary.js')

exports.seed = function seedBeneficiaryTable(knex) {
  // Deletes ALL existing entries
  return knex(tableBeneficiary)
    .del()
    .then(function insertBeneficiaries() {
      // Inserts seed entries
      return knex(tableBeneficiary).insert([
        {
          BeneficiaryId: '0001',
          RefereeId: '1002',
          Name: 'ziza',
          Email: 'zizah@azizah@.com',
          Phone: '596424222',
          Address: '100 victoria street',
          Occupation: 'software engineer',
          HouseholdIncome: '$1333',
          HouseholdSize: '4',
          PaymentType: PaymentTypeEnum.PayNow,
        },
      ])
    })
}

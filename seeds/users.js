/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
const {tableUser} = require('../src/models/user')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableUser)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableUser).insert([
        {
          BeneficiaryId: '0001',
          RefereeId: '1002',
          Name: 'ziza',
          Email: 'zizah@azizah@.com',
          Phone: '596424222',
          Address: '100 victoria street',
          Occupation: 'software engineer',
          MaritalStatus: 'Female',
          Income: '$1333',
          CaseId: '20002',
        },
      ])
    })
}

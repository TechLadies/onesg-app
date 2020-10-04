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
          email: 'zizah@azizah@.com',
          phone: '596424222',
          Address: '100 victoria street',
          occupation: 'software engineer',
          MaritalStatus: 'Female',
          Income: '$1333',
          CaseId: '20002',
        },
      ])
    })
}

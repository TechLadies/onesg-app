/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
const {tableReferee} = require('../src/models/referee')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableReferee)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableReferee).insert([
        {
          RefereeId: '1002',
          Name: 'Atu',
          email: 'ahl@aok.com',
          phone: '34673662',
          Organisation: 'Techladies',

        },
      ])
    })
}

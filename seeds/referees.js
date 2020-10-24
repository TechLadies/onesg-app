const { tableReferee } = require('../src/models/referee');

exports.seed = function seedRefereeTable(knex) {
  // Deletes ALL existing entries
  return knex(tableReferee)
    .del()
    .then(function insertReferees() {
      // Inserts seed entries
      return knex(tableReferee).insert([
        {
          RefereeId: '1002',
          Name: 'Atu',
          Email: 'ahl@aok.com',
          Phone: '34673662',
          Organisation: 'Techladies',
        },
      ]);
    });
};

const { tableReferee } = require('../src/models/referee');

exports.seed = function seedRefereeTable(knex) {
  // Deletes ALL existing entries
  return knex(tableReferee)
    .del()
    .then(function insertReferees() {
      // Inserts seed entries
      return knex(tableReferee).insert([
        {
          refereeId: '1002',
          name: 'Atu',
          email: 'ahl@aok.com',
          phone: '34673662',
          organisation: 'Techladies',
        },
      ]);
    });
};

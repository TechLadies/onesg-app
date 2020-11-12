const { tableReferee } = require('../src/models/referee');

exports.seed = function seedRefereeTable(knex) {
  // Deletes ALL existing entries
  return knex(tableReferee)
    .del()
    .then(function insertReferees() {
      // Inserts seed entries
      return knex(tableReferee).insert([
        {
          refereeId: 'R202011-0001',
          name: 'Atu',
          email: 'ahl@aok.com',
          phone: '64673662',
          organisation: 'Techladies',
        },
      ]);
    });
};

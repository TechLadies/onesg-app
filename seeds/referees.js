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
          phone: '34673662',
          organisation: 'Techladies',
        },
        {
          refereeId: 'R202011-0002',
          name: 'Siddique',
          email: 'cropoc@hotmail.com.',
          phone: '90093711',
          organisation: 'Siddique Impex',
        },
      ]);
    });
};

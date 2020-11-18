const { tableReferee } = require('../src/models/referee');

exports.seed = function seedRefereeTable(knex) {
  // Deletes ALL existing entries
  return knex(tableReferee)
    .del()
    .then(function insertReferees() {
      // Inserts seed entries
      return knex(tableReferee).insert([
        {
          refereeId: '0001',
          name: 'Atu',
          email: 'ahl@aok.com',
          phone: '34673662',
          organisation: 'Techladies',
        },
        {
          refereeId: '0002',
          name: 'Brenda Song',
          phone: '911111111',
          organisation: 'Google',
        },
        {
          refereeId: '0003',
          name: 'Chong Yee',
          phone: '61113333',
        },
      ]);
    });
};

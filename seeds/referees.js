const { tableReferee } = require('../src/models/referee');

exports.seed = function seedRefereeTable(knex) {
  // Deletes ALL existing entries
  return knex(tableReferee)
    .del()
    .then(function insertReferees() {
      // Inserts seed entries
      return knex(tableReferee).insert([
        {
          refereeId: 'R2020-11001',
          name: 'Atu',
          email: 'ahl@aok.com',
          phone: '64673662',
          organisation: 'Techladies',
        },
        {
          refereeId: 'R2020-11002',
          name: 'Brenda Song',
          phone: '91111111',
          organisation: 'Google',
        },
        {
          refereeId: 'R2020-11003',
          name: 'Chong Yee',
          email: 'cy123@nalgene.com',
          phone: '61113333',
        },
      ]);
    });
};

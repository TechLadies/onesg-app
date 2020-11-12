const { tableReferee } = require('../src/models/referee');

exports.seed = function seedRefereeTable(knex) {
  // Deletes ALL existing entries
  return knex(tableReferee)
    .del()
    .then(function insertReferees() {
      // Inserts seed entries
      return knex(tableReferee).insert([
        {
<<<<<<< HEAD
          refereeNumber: 'R2020-11001',
=======
          refereeId: 'R202011-0001',
>>>>>>> cleaned migration files and change created_at to id in idgenerator
          name: 'Atu',
          email: 'ahl@aok.com',
          phone: '67346628',
          organisation: 'Techladies',
          createdBy: 1,
          updatedBy: 1,
        },
        {
          refereeNumber: 'R2020-11002',
          name: 'Brenda Song',
          phone: '91111111',
          organisation: 'Google',
          createdBy: 1,
          updatedBy: 2,
        },
        {
          refereeNumber: 'R2020-11003',
          name: 'Chong Yee',
          email: 'cy123@nalgene.com',
          phone: '61113333',
          createdBy: 2,
          updatedBy: 1,
        },
      ]);
    });
};

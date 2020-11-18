const { tableReferee } = require('../src/models/referee');

exports.seed = function seedRefereeTable(knex) {
  // Deletes ALL existing entries
  return knex(tableReferee)
    .del()
    .then(function insertReferees() {
      // Inserts seed entries
      return knex(tableReferee).insert([
        {
          refereeId: 'R202011-001',
          name: 'Atu',
          email: 'ahl@aok.com',
          phone: '346736628',
          organisation: 'Techladies',
        },
        {
          refereeId: 'R202011-002',
          name: 'Brenda Song',
          phone: '91111111',
          organisation: 'Google',
        },
        {
          refereeId: 'R202011-003',
          name: 'Chong Yee',
          phone: '61113333',
        },
      ]);
    });
};

const { tableStaff } = require('../src/models/staff.js');

exports.seed = function seedStaffTable(knex) {
  // Deletes ALL existing entries
  return knex(tableStaff)
    .del()
    .then(function insertStaffs() {
      // Inserts seed entries
      return knex(tableStaff).insert([
        {
          username: 'Angela',
          password:
            '7D79723653EBF983C2EA750913E2D3276129AC65BC4C071C060D71C730A427DB',
          email: 'angela@onesingapore.org.sg',
          isAdmin: false,
          status: 'ACTIVE',
        },
        {
          username: 'Minnie',
          password:
            '8D5C39B54BC9862BA36BC6488B27E67A42A7F74EF59A91E866DA9D27540F7216',
          email: 'mrinalini@onesingapore.org.sg',
          isAdmin: true,
          status: 'ACTIVE',
        },
        {
          username: 'Catherine',
          password:
            '96F12B28D735C75378017ACC8DB6E1881CEF8F6C8A8EF38666951F69B6738933',
          email: 'catherine@onesingapore.org.sg',
          isAdmin: false,
          status: 'DISABLED',
        },
        {
          username: 'Hui Li',
          password:
            'FC5B54818BB690825183CBB08DD631CA708C5A4ECE89FEE91993D1C96E25C850',
          email: 'huili@onesingapore.org.sg',
          isAdmin: true,
          status: 'DISABLED',
        },
      ]);
    });
};

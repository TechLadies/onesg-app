const { tableStaff } = require('../src/models/staff.js');
const { staffStatusEnum } = require('../src/models/staff.js');

exports.seed = function seedStaffTable(knex) {
  // Deletes ALL existing entries
  return knex(tableStaff)
    .del()
    .then(function insertStaffs() {
      // Inserts seed entries
      return knex(tableStaff).insert([
        {
          username: 'Angela',
          email: 'angela@onesingapore.org.sg',
          isAdmin: false,
          status: staffStatusEnum.active,
        },
        {
          username: 'Minnie',
          email: 'mrinalini@onesingapore.org.sg',
          isAdmin: true,
          status: staffStatusEnum.active,
        },
        {
          username: 'Catherine',
          email: 'catherine@onesingapore.org.sg',
          isAdmin: false,
          status: staffStatusEnum.disabled,
        },
        {
          username: 'Hui Li',
          email: 'huili@onesingapore.org.sg',
          isAdmin: true,
          status: staffStatusEnum.disabled,
        },
      ]);
    });
};

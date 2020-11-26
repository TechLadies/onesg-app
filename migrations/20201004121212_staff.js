const { tableStaff } = require('../src/models/staff.js');
const { staffStatusEnum } = require('../src/models/staff.js');

exports.up = function makeStaffTable(knex) {
  return knex.schema.createTable(tableStaff, (table) => {
    table.increments('id').primary().index();
    table.string('username');
    table.string('email').unique();
    table.boolean('isAdmin');
    table.enum('status', Object.values(staffStatusEnum));
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function exportStaffTable(knex) {
  return knex.schema.dropTable(tableStaff);
};

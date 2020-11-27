const { tableStaff } = require('../src/models/staff.js');
const { staffStatusEnum } = require('../src/models/staff.js');

exports.up = function makeStaffTable(knex) {
  return knex.schema.createTable(tableStaff, (table) => {
    table.increments('id').primary().index();
    table.string('username', 255).notNullable();
    table.string('email', 255).unique().notNullable();
    table.boolean('isAdmin').notNullable();
    table.enum('status', staffStatusEnum).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function exportStaffTable(knex) {
  return knex.schema.dropTable(tableStaff);
};

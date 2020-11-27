const { tableStaff } = require('../src/models/staff.js');
const { staffStatusEnum } = require('../src/models/staff.js');

exports.up = function makeStaffTable(knex) {
  return knex.schema.createTable(tableStaff, (table) => {
    table.increments('id').primary().index();
    table
      .string('username', 255)
      .notNullable()
      .comment('OneSG staff account username');
    table
      .string('email', 255)
      .unique()
      .notNullable()
      .comment('OneSG staff account email');
    table
      .boolean('isAdmin')
      .notNullable()
      .comment('OneSG staff account admin status');
    table
      .enum('status', staffStatusEnum)
      .notNullable()
      .comment('OneSG staff account status: active or disabled');
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .comment('Date of staff account creation');
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .comment('Date of staff account update');
  });
};

exports.down = function exportStaffTable(knex) {
  return knex.schema.dropTable(tableStaff);
};

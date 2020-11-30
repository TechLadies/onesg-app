const { tableStaff } = require('../src/models/staff.js');
const { staffStatusEnum } = require('../src/models/staff.js');

exports.up = function makeStaffTable(knex) {
  return knex.schema.createTable(tableStaff, (table) => {
    table.increments('id').primary().index();
    table
      .string('username', 100)
      .notNullable()
      .comment('OneSG staff account username');
    table
      .text('password', 20)
      .notNullable()
      .comment('Password hash; text type is used to future-proof');
    table
      .string('email', 50)
      .unique()
      .notNullable()
      .comment('OneSG staff account email');
    table
      .boolean('isAdmin')
      .notNullable()
      .comment('Indicates whether the staff has admin access to OneSG app');
    table
      .enum('status', staffStatusEnum)
      .notNullable()
      .comment('Account status: active or disabled');
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

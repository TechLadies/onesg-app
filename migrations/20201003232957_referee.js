const { tableReferee } = require('../src/models/referee.js');
const { tableStaff } = require('../src/models/staff.js');

exports.up = function makeRefereetable(knex) {
  return knex.schema.createTable(tableReferee, (table) => {

    table.increments('id').primary();
    table
      .string('refereeNumber', 11)
      .index()
      .unique()
      .comment('Format: RYYYY-MM999');
    table.string('name', 100);
    table.string('email', 50).unique();
    table.string('phone', 8).unique();
    table.string('organisation', 100);
    table
      .integer('createdBy')
      .references('id')
      .inTable(tableStaff)
      .unsigned()
      .notNullable()
      .comment('OneSG staff who created this referee');
    table
      .integer('updatedBy')
      .references('id')
      .inTable(tableStaff)
      .unsigned()
      .notNullable()
      .comment('OneSG staff who updated this referee');
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .comment('Date of referee creation');
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .comment('Date of referee update');
    table.text('name');
    table.text('email').unique();
    table.text('phone').unique();
    table.text('organisation');
    table.timestamps(true, true);
  });
};

exports.down = function exportRefereetable(knex) {
  return knex.schema.dropTable(tableReferee);
};

const { tableReferee } = require('../src/models/referee.js');

exports.up = function makeRefereetable(knex) {
  return knex.schema.createTable(tableReferee, (table) => {
    table.increments('id').primary();
    table.string('refereeId').index().unique();
    table.string('name');
    table.string('email').unique();
    table.string('phone').unique();
    table.string('organisation');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function exportRefereetable(knex) {
  return knex.schema.dropTable(tableReferee);
};

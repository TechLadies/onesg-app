const { tableReferee } = require('../src/models/referee.js');

exports.up = function makeRefereetable(knex) {
  return knex.schema.createTable(tableReferee, (table) => {
    table.increments('id').primary();
    table.string('refereeId').index().unique();
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

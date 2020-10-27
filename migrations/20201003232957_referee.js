const { tableReferee } = require('../src/models/referee.js');

exports.up = function makeRefereetable(knex) {
  return knex.schema.createTable(tableReferee, (table) => {
    table.increments('RefereeId').primary();
    table.text('Name');
    table.text('Email').unique();
    table.text('Phone').unique();
    table.text('Organisation');
    table.timestamps(true, false);
  });
};

exports.down = function exportRefereetable(knex) {
  return knex.schema.dropTable(tableReferee);
};

const { tableReferee } = require('../src/models/referee.js');

exports.up = function makeRefereetable(knex) {
  return knex.schema.createTable(tableReferee, (table) => {
    // table.increments('refId').primary();
    table.increments('refereeId').primary();
    table.string('name');
    table.string('email').unique();
    table.string('phone').unique();
    table.string('organisation');
    table.timestamps(true, true);
  });
};

exports.down = function exportRefereetable(knex) {
  return knex.schema.dropTable(tableReferee);
};

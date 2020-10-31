const { tableReferee } = require('../src/models/referee.js');

exports.up = function makeRefereetable(knex) {
  return knex.schema.createTable(tableReferee, (table) => {
<<<<<<< HEAD
    table.increments('refId').primary();
    table.string('refereeId').index();
    table.string('name');
    table.string('email').unique();
    table.string('phone').unique();
    table.string('organisation');
=======
    table.increments('RefereeId').primary();
    table.text('Name');
    table.text('Email').unique();
    table.text('Phone').unique();
    table.text('Organisation');
>>>>>>> revise env
    table.timestamps(true, true);
  });
};

exports.down = function exportRefereetable(knex) {
  return knex.schema.dropTable(tableReferee);
};

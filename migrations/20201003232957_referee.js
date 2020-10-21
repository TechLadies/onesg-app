const { tableReferee } = require('../src/models/referee.js');

exports.up = function makeRefereetable(knex) {
  return knex.schema.createTable(tableReferee, (table) => {
<<<<<<< HEAD
    table.increments('RefereeId').primary();
    table.text('Name');
    table.text('Email').notNullable().unique();
    table.text('Phone').notNullable().unique();
    table.text('Organisation');
    table.timestamps(true, false);
  });
};
=======
    table.increments('RefereeId').primary().unique()
    table.text('Name')
    table.text('Email').notNullable().unique()
    table.text('Phone').notNullable().unique()
    table.text('Organisation')
    table.timestamps(true, false)
  })
}
>>>>>>> changed db to postgres & tested with referee

exports.down = function exportRefereetable(knex) {
  return knex.schema.dropTable(tableReferee);
};

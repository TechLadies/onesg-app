const { tableRequestType } = require('../src/models/requestType.js');

exports.up = function makeRequestTypeTable(knex) {
  return knex.schema.createTable(tableRequestType, (table) => {
    table.increments('id').primary().index();
    table.string('description').unique();
  });
};

exports.down = function exportRequestTypeTable(knex) {
  return knex.schema.dropTable(tableRequestType);
};

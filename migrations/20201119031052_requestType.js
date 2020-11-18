const { tableRequestType } = require('../src/models/requestType.js');

exports.up = function exportRequestTypeTable(knex) {
  return knex.schema.createTable(tableRequestType, (table) => {
    table.increments('id').primary().index();
    table.string('requestTypeName');
    table.string('description');
  });
};

exports.down = function exportRequestTypeTable(knex) {
  return knex.schema.dropTable(tableRequestType);
};

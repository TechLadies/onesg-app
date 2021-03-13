const { tableTag } = require('../src/models/tag.js');

exports.up = function makeTagTable(knex) {
  return knex.schema.createTable(tableTag, (table) => {
    table.increments('id').primary().index();
    table.string('name', 25).notNullable().unique().comment('Name of tag');
  });
};

exports.down = function exportTagTable(knex) {
  return knex.schema.dropTable(tableTag);
};

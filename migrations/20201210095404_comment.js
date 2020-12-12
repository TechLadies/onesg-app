const { tableComments } = require('../src/models/comment.js');
const { tableCase } = require('../src/models/case.js');

exports.up = function makeCommentstable(knex) {
  return knex.schema.createTable(tableComments, (table) => {
    table.increments('id').primary().index();
    table.text('message');
    table.string('author');
    table
      .string('caseNumber')
      .references('caseNumber')
      .inTable(tableCase)
      .comment('Case this comment belongs to');
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .comment('Date of comment creation');
  });
};

exports.down = function exportCommentstable(knex) {
  return knex.schema.dropTable(tableComments);
};

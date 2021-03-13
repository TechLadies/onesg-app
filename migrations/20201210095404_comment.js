const { tableComments } = require('../src/models/comment.js');
const { tableCase } = require('../src/models/case.js');
const { tableStaff } = require('../src/models/staff.js');

exports.up = function makeCommentsTable(knex) {
  return knex.schema.createTable(tableComments, (table) => {
    table.increments('id').primary().index();
    table.text('message');
    table
      .integer('caseId')
      .references('id')
      .inTable(tableCase)
      .comment('Case this comment belongs to');
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .comment('Date of comment creation');
    table
      .integer('staffId')
      .references('id')
      .inTable(tableStaff)
      .comment('Case this comment belongs to');
  });
};

exports.down = function exportCommentsTable(knex) {
  return knex.schema.dropTable(tableComments);
};

/* eslint-disable func-names */
const { tableReferee } = require('../src/models/referee.js')

exports.up = function (knex) {
  return knex.schema.createTable(tableReferee, (table) => {
    table.increments('RefereeId').primary()
    table.text('Name')
    table.text('email').notNullable().unique()
    table.text('phone').notNullable().unique()
    table.text('Organisation')
    table.timestamps(true, false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable(tableReferee)
}

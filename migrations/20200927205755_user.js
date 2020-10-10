/* eslint-disable func-names */
const { tableUser } = require('../src/models/user.js')

exports.up = function (knex) {
  return knex.schema.createTable(tableUser, (table) => {
    table.increments('BeneficiaryId').primary()
    table.integer('RefereeId').unique()
    table.text('Name')
    table.text('email').notNullable().unique()
    table.text('phone').notNullable().unique()
    table.text('Address')
    table.text('occupation')
    table.enum('MaritalStatus', ['Female', 'Male'])
    table.decimal('Income')
    table.timestamps(true, true)
  })
}

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTable(tableUser)
}

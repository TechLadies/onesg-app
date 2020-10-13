const { tableUser } = require('../src/models/user.js')

exports.up = function makeUsertable(knex) {
  return knex.schema.createTable(tableUser, (table) => {
    table.increments('BeneficiaryId').primary()
    table.integer('RefereeId').unique()
    table.text('Name')
    table.text('Email').notNullable().unique()
    table.text('Phone').notNullable().unique()
    table.text('Address')
    table.text('Occupation')
    table.enum('MaritalStatus', ['Female', 'Male'])
    table.decimal('Income')
    table.timestamps(true, true)
  })
}

exports.down = function exportUsertable(knex) {
  return knex.schema.dropTable(tableUser)
}

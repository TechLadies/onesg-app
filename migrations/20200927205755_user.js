'use strict'

const tableName = require('../models/user.js')

exports.up = function (knex) {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary();
        table.text('email').notNullable().unique();
        table.text('passwordHash').notNullable().unique();
        table.text('firstName');
        table.text('lastName');
        table.text('occupation');
        table.timestamps(true, true);
    })
}


exports.down = function (knex) {
    return knex.schema.dropTable(tableName);
}

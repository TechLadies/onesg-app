'use strict'

const { Model } = require('objection')
const Knex = require('knex')

const tableUser = 'users'

class User extends Model {
  static get tableName() {
    return tableUser
  }


  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'Name', 'phone'],
      properties: {
        beneficiaryId: { type: 'integer' },
        refereeId: { type: ['integer', 'null'] },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        phone: { type: 'varchar', maxLength: 12 },
        address: { type: 'varchar', maxLength: 255 },
        occupation: { type: 'string', maxLength: 255 },
        maritalStatus: { type: 'enum' },
        income: { type: 'decimal', minLength: 1 },
        caseId: { type: 'integer' },
      },
    }
  }
}

module.exports = {
  User,
  model: User,
  tableUser,
}

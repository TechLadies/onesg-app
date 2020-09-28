'use strict'

const  { Model } = require('objection')
const Knex = require("knex")

const tableName = 'users'

class User extends Model {
    static get tableName () {
        return tableName
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email'],
            properties: {
                id: { type: 'integer' },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                passwordHash: { type: 'string' },
                firstName: { type: 'string', maxLength: 255 },
                lastName: { type: 'string', maxLength: 255 },
                occupation: {type: 'string', maxLength: 255}
            }
        }
    }
}

module.exports = {
    User,
    model: User,
    tableName
}

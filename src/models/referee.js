/* eslint-disable lines-around-directive */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict'

const { Model } = require('objection')
const Knex = require('knex')

const tableReferee = 'referees'

class Referee extends Model {
  static get tableName() {
    return tableReferee
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['Email', 'Name', 'Phone'],
      properties: {
        RefereeId: { type: 'integer' },
        Name: { type: 'string', minLength: 1, maxLength: 255 },
        Email: { type: 'string', minLength: 1, maxLength: 255 },
        Phone: { type: 'varchar', maxLength: 12 },
        Organisation: { type: 'varchar', maxLength: 255 },
      },
    }
  }
}

module.exports = {
  Referee,
  model: Referee,
  tableReferee,
}

/* eslint-disable strict */

'use strict';

const { Model, ValidationError } = require('objection');
// const { check } = require('express-validator');

const tableReferee = 'referees';

class Referee extends Model {
  static get tableName() {
    return tableReferee;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['Name', 'Phone'],
      properties: {
        refereeId: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { maxLength: 255 },
        phone: { type: 'varchar', minLength: 8, maxLength: 8 },
        organisation: { type: 'varchar', maxLength: 255 },
      },
    };
  }

  $afterValidate(json) {
    super.$afterValidate(json);
    // validate email
    if (json.email !== null) {
      if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(json.email) === false) {
        throw new ValidationError({
          message: `Email format "${json.email}" is invalid`,
        });
      }
    }
    // validate phone
    if (/^(6|8|9)\d{7}$/.test(json.phone) === false) {
      throw new ValidationError({
        message: `Phone format "${json.phone}" is invalid. Must be numeric and start with 6, 8 or 9`,
      });
    }
  }
}

module.exports = {
  Referee,
  model: Referee,
  tableReferee,
};

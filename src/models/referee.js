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
        RefereeId: { type: 'integer' },
        Name: { type: 'string', minLength: 1, maxLength: 255 },
        Email: { maxLength: 255 },
        Phone: { type: 'varchar', minLength: 8, maxLength: 8 },
        Organisation: { type: 'varchar', maxLength: 255 },
      },
    };
  }

  $afterValidate(json) {
    super.$afterValidate(json);
    // validate email
    if (json.Email !== null) {
      if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(json.Email) === false) {
        throw new ValidationError({
          message: `Email format "${json.Email}" is invalid`,
        });
      }
    }
    // validate phone
    if (/^(6|8|9)\d{7}$/.test(json.Phone) === false) {
      throw new ValidationError({
        message: `Phone format "${json.Phone}" is invalid. Must be numeric and start with 6, 8 or 9`,
      });
    }
  }
}

module.exports = {
  Referee,
  model: Referee,
  tableReferee,
};

/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

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
}
module.exports = {
  Referee,
  model: Referee,
  tableReferee,
};

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
      required: ['name'],
      properties: {
        refereeId: { type: 'varchar' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        phone: { type: 'varchar', maxLength: 12 },
        organisation: { type: 'varchar', maxLength: 255 },
      },
    };
  }
}
module.exports = {
  Referee,
  model: Referee,
  tableReferee,
};

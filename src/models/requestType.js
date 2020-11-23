/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

const tableRequestType = 'requestType';
class RequestType extends Model {
  static get tableName() {
    return tableRequestType;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['description'],
      properties: {
        description: { type: 'varchar', minLength: 1, maxLength: 50 },
      },
    };
  }
}

module.exports = {
  RequestType,
  model: RequestType,
  tableRequestType,
};

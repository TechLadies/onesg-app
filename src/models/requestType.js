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
      required: ['type'],
      properties: {
        type: { type: 'string', maxLength: 50 },
      },
    };
  }
}

module.exports = {
  RequestType,
  model: RequestType,
  tableRequestType,
};

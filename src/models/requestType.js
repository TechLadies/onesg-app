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
      properties: {
        requestTypeName: { type: 'varchar' },
        description: { type: 'varchar' },
      },
    };
  }
}

module.exports = {
  RequestType,
  model: RequestType,
  tableRequestType,
};

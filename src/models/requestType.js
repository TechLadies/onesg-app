/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

const { Request } = require('./request');

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

  static get relationMappings() {
    return {
      request: {
        relation: Model.BelongsToOneRelation,
        modelClass: Request,
        join: {
          from: 'requestType.id',
          to: 'request.requestTypeId',
        },
      },
    };
  }
}

module.exports = {
  RequestType,
  model: RequestType,
  tableRequestType,
};

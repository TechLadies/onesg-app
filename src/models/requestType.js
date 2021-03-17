/* eslint-disable strict */

'use strict';

const { ValidationError, Model } = require('objection');

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

  $afterValidate(json) {
    super.$afterValidate(json);
    const requests = json;
    if (requests.type === '') {
      throw new ValidationError({
        message: 'Request type cannot be empty',
      });
    }
  }
}

module.exports = {
  RequestType,
  model: RequestType,
  tableRequestType,
};

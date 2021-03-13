/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

const tableTag = 'tag';
class Tag extends Model {
  static get tableName() {
    return tableTag;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        type: { type: 'string', maxLength: 25 },
      },
    };
  }
}

module.exports = {
  Tag,
  model: Tag,
  tableTag,
};

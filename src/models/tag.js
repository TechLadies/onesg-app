/* eslint-disable strict */

'use strict';

const { Model, ValidationError } = require('objection');

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
        name: { type: 'string', maxLength: 25 },
      },
    };
  }

  $afterValidate(tag) {
    super.$afterValidate(tag);
    // validate tag name
    if (tag.name === '' || tag.name === null || tag.name === undefined) {
      throw new ValidationError({
        message: `Empty name is not allowed`,
      });
    }
  }
}

module.exports = {
  Tag,
  model: Tag,
  tableTag,
};

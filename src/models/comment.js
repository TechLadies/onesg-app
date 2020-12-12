/* eslint-disable strict */

'use strict';

const { Model } = require('objection');
const { InvalidInput } = require('../utils/errors');

const tableComments = 'comment';
class Comment extends Model {
  $beforeValidate() {
    if (/<.*?script.*\/?>/.test(this.message) === true) {
      throw new InvalidInput({
        message: `Message is invalid.`,
      });
    }
  }

  static get tableName() {
    return tableComments;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['message'],
      properties: {
        message: { type: 'text' },
        author: { type: 'string' },
        caseNumber: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      cases: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Case`,
        join: {
          from: 'comment.caseNumber',
          to: 'case.caseNumber',
        },
      },
    };
  }
}
module.exports = {
  Comment,
  model: Comment,
  tableComments,
};

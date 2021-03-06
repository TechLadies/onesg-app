'use strict';

const { Model } = require('objection');

const tableComments = 'comment';
class Comment extends Model {
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

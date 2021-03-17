'use strict';

const { Model } = require('objection');
const { Staff } = require('./staff');

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
        caseId: { type: 'integer' },
        staffId: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      cases: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Case`,
        join: {
          from: 'comment.caseId',
          to: 'case.id',
        },
      },
      staffs: {
        relation: Model.BelongsToOneRelation,
        modelClass: Staff,
        join: {
          from: 'comment.staffId',
          to: 'staff.id',
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

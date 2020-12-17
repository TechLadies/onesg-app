/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

const staffStatusEnum = ['ACTIVE', 'DISABLED'];

const tableStaff = 'staff';
class Staff extends Model {
  static get tableName() {
    return tableStaff;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password', 'email', 'isAdmin', 'status'],
      properties: {
        username: { type: 'string', maxLength: 100 },
        password: { type: 'string' },
        email: { type: 'string', maxLength: 50 },
        isAdmin: {
          type: 'boolean',
          $comment: 'Indicates if staff has admin access to OneSG app',
        },
        status: {
          type: 'enum',
          enum: staffStatusEnum,
          $comment: 'Indicates if staff has access to OneSG app',
        },
      },
    };
  }
}

module.exports = {
  Staff,
  model: Staff,
  tableStaff,
  staffStatusEnum,
};

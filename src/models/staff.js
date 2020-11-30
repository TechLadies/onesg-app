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
      required: ['username', 'password', 'email', 'isAmin', 'status'],
      properties: {
        username: { type: 'string', maxLength: 100 },
        password: { type: 'string', maxLength: 20 },
        email: { type: 'string', maxLength: 50 },
        isAdmin: { type: 'boolean' },
        status: {
          type: 'enum',
          enum: staffStatusEnum,
          $comment: 'Indicates if staff has admin access to OneSG app',
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

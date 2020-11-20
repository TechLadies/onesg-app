/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

const staffStatusEnum = {
  active: 'ACTIVE',
  disabled: 'DISABLED',
};

const tableStaff = 'staff';
class Staff extends Model {
  static get tableName() {
    return tableStaff;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        username: { type: 'varchar' },
        email: { maxLength: 255 },
        isAdmin: { type: 'boolean' },
        status: { type: 'enum', enum: staffStatusEnum },
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

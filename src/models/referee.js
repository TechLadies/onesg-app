/* eslint-disable strict */

'use strict';

const { Model } = require('objection');
const { Beneficiary } = require('./beneficiary');
const { Case } = require('./case');

const tableReferee = 'referees';

class Referee extends Model {
  static get tableName() {
    return tableReferee;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        refereeId: { type: 'varchar' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        phone: { type: 'varchar', maxLength: 12 },
        organisation: { type: 'varchar', maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      cases: {
        relation: Model.HasManyRelation,
        modelClass: Case,
        join: {
          from: 'referees.refereeId',
          to: 'cases.refereeId',
        },
        beneficiary: {
          relation: Model.ManyToManyRelation,
          modelClass: Beneficiary,
          join: {
            from: 'referees.refereeId',
            through: {
              from: 'cases.refereeId',
              to: 'cases.beneficiaryId',
            },
            to: 'beneficiary.beneficiaryId',
          },
        },
      },
    };
  }
}

module.exports = {
  Referee,
  model: Referee,
  tableReferee,
};

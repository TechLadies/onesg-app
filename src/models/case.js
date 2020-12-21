const { Model } = require('objection');
const { Beneficiary } = require('./beneficiary');
const { Referee } = require('./referee');
const { Request } = require('./request');

const caseStatusEnum = ['NEW', 'PENDING', 'REFERRED', 'PROCESSING', 'CLOSED'];

const referenceStatusEnum = ['UNVERIFIED', 'PENDING', 'VERIFIED'];

const tableCase = 'case';

class Case extends Model {
  static get tableName() {
    return tableCase;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['amountRequested', 'beneficiaryId', 'createdBy', 'updatedBy'],
      properties: {
        caseNumber: { type: 'string', minLength: 12, maxLength: 12 },
        caseStatus: { type: 'string', enum: caseStatusEnum, default: 'NEW' },
        appliedOn: { type: 'date', $comment: 'YYYY-MM-DD' },
        pointOfContact: { type: 'string', maxLength: 100 },
        referenceStatus: {
          type: 'string',
          enum: referenceStatusEnum,
          default: 'UNVERIFIED',
        },
        casePendingReason: {
          type: 'string',
          maxLength: 255,
          $comment: 'Required if referenceStatus is PENDING',
        },
        amountRequested: { type: 'decimal', maxLength: 8 },
        amountGranted: {
          type: 'decimal',
          maxLength: 8,
          default: 0.0,
        },
        refereeId: { type: 'integer' },
        beneficiaryId: { type: 'integer' },
        createdBy: { type: 'integer' },
        updatedBy: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      beneficiary: {
        relation: Model.BelongsToOneRelation,
        modelClass: Beneficiary,
        join: {
          from: 'case.beneficiaryId',
          to: 'beneficiary.id',
        },
      },

      referee: {
        relation: Model.BelongsToOneRelation,
        modelClass: Referee,
        join: {
          from: 'case.refereeId',
          to: 'referee.id',
        },
      },

      request: {
        relation: Model.HasManyRelation,
        modelClass: Request,
        join: {
          from: 'case.id',
          to: 'request.caseId',
        },
      },
    };
  }
}

module.exports = {
  Case,
  model: Case,
  tableCase,
  caseStatusEnum,
  referenceStatusEnum,
};

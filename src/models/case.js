const { Model } = require('objection');

const caseStatusEnum = ['NEW', 'PENDING', 'REFERRED', 'PROCESSING', 'CLOSED'];

const referenceStatusEnum = ['UNVERIFIED', 'PENDING', 'VERIFIED'];

const tableCase = 'case';

class Case extends Model {
  static get modifiers() {
    return {
      caseNumber(builder) {
        builder.select('caseNumber');
      },
    };
  }

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
        modelClass: `${__dirname}/Beneficiary`,
        join: {
          from: 'case.beneficiaryId',
          to: 'beneficiary.id',
        },
      },
      referees: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Referee`,
        join: {
          from: 'case.refereeId',
          to: 'referee.id',
        },
      },
      beneficiary: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Beneficiary`,
        join: {
          from: 'case.beneficiaryId',
          to: 'beneficiary.id',
        },
      },
      referees: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Referee`,
        join: {
          from: 'case.refereeId',
          to: 'referee.id',
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Comment`,
        join: {
          from: 'case.id',
          to: 'comment.caseId',
        },
      },
    };
  }
}
module.exports = {
  model: Case,
  tableCase,
  caseStatusEnum,
  referenceStatusEnum,
};

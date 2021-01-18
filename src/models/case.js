const { Model } = require('objection');
const { Beneficiary } = require('./beneficiary');
const { Referee } = require('./referee');
const { Request } = require('./request');
const { Staff } = require('./staff');

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

  $parseDatabaseJson(json) {
    super.$parseDatabaseJson(json);
    if (json.appliedOn !== undefined) {
      const year = json.appliedOn.getFullYear();
      const month = `0${json.appliedOn.getMonth() + 1}`.slice(-2);
      const day = `0${json.appliedOn.getDate()}`.slice(-2);
      const date = `${year}-${month}-${day}`;
      // eslint-disable-next-line no-param-reassign
      json.appliedOn = date;
    }
    return json;
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

      createdby: {
        relation: Model.BelongsToOneRelation,
        modelClass: Staff,
        join: {
          from: 'case.createdBy',
          to: 'staff.id',
        },
      },

      updatedby: {
        relation: Model.BelongsToOneRelation,
        modelClass: Staff,
        join: {
          from: 'case.updatedBy',
          to: 'staff.id',
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

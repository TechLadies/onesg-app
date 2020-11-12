const { Model } = require('objection');

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
<<<<<<< HEAD
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
=======
        beneficiaryId: { type: 'varchar' },
        refereeId: { type: 'varchar' },
        caseId: { type: 'varchar' },
        requestType: { type: 'enum' },
        fulfilment: { type: 'enum' },
        POC: { type: 'varchar', maxLength: 255 },
        amountRequested: { type: 'decimal' },
        description: { type: 'varchar', maxLength: 255 },
        caseStatus: { type: 'enum' },
        eeferenceStatus: { type: 'enum' },
        approval: { type: 'enum' },
        amountGranted: { type: 'decimal' },
>>>>>>> cleaned migration files and change created_at to id in idgenerator
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

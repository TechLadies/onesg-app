const { Model } = require('objection');

const caseStatusEnum = {
  new: 'NEW',
  pending: 'PENDING',
  referred: 'REFERRED',
  processing: 'PROCESSING',
  closed: 'CLOSED',
};

const referenceStatusEnum = {
  unverified: 'UNVERIFIED',
  pending: 'PENDING',
  verified: 'VERIFIED',
};

const tableCase = 'cases';

class Case extends Model {
  static get tableName() {
    return tableCase;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        caseId: { type: 'varchar' },
        caseStatus: { type: 'enum' },
        appliedOn: { type: 'date' }, // 2018-11-13
        pointOfContact: { type: 'varchar' },
        referenceStatus: { type: 'enum' },
        pendingStatusReason: { type: 'varchar' },
        amountRequested: { type: 'decimal' },
        amountGranted: { type: 'decimal', multipleOf: '1.00' },
        documents: { type: 'array' },
        refereeId: { type: 'varchar' },
        beneficiaryId: { type: 'varchar' },
        createdBy: { type: 'integer' },
        updatedBy: { type: 'integer' },
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

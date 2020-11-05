const { Model } = require('objection');
const { Beneficiary } = require('./beneficiary');
const { Referee } = require('./referee');

<<<<<<< HEAD
const caseStatusEnum = ['NEW', 'PENDING', 'REFERRED', 'PROCESSING', 'CLOSED'];

const referenceStatusEnum = ['UNVERIFIED', 'PENDING', 'VERIFIED'];
=======
const requestTypeEnum = {
  cookedFood: 'cookedFood',
  diapers: 'diapers',
  financialAssistance: 'financialAssistance',
  medicalBill: 'medicalBill',
  milkFormula: 'milkFormula',
  schoolFees: 'schoolFees',
  transportationFees: 'transportationFees',
  utilityBill: 'utilityBill',
};

const fulfilmentTypeEnum = {
  inKindDonation: 'inKindDonation',
  cashTransfer: 'cashTransfer',
  thirdpartyPayment: 'third-partyPayment',
  partnerReferral: 'partnerReferral',
};

const caseStatusTypeEnum = {
  new: 'new',
  onHold: 'onHold',
  referredtoEFC: 'referredtoEFC',
  processing: 'processing',
  closed: 'closed',
};

const referenceStatusTypeEnum = {
  unverified: 'unverified',
  pending: 'pending',
  verified: 'verified',
};
const approvalTypeEnum = {
  NIL: '-',
  full: 'full',
  partial: 'partial',
  rejected: 'rejected',
};
>>>>>>> cleaned error & change fields to camelcase

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
          from: 'cases.beneficiaryId',
          to: 'beneficiary.beneficiaryId',
        },
      },
      referees: {
        relation: Model.BelongsToOneRelation,
        modelClass: Referee,
        join: {
          from: 'cases.refereeId',
          to: 'referees.refereeId',
        },
      },
    };
  }
}

module.exports = {
  model: Case,
  tableCase,
<<<<<<< HEAD
  caseStatusEnum,
  referenceStatusEnum,
=======
  requestTypeEnum,
  fulfilmentTypeEnum,
  referenceStatusTypeEnum,
  approvalTypeEnum,
  caseStatusTypeEnum,
>>>>>>> cleaned error & change fields to camelcase
};

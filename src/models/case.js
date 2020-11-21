const { Model } = require('objection');
const { Beneficiary } = require('./beneficiary');
const { Referee } = require('./referee');

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

const tableCase = 'cases';

class Case extends Model {
  static get tableName() {
    return tableCase;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
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
          from: 'cases.RefereeId',
          to: 'referees.refereeId',
        },
      },
    };
  }
}

module.exports = {
  Case,
  model: Case,
  tableCase,
  requestTypeEnum,
  fulfilmentTypeEnum,
  referenceStatusTypeEnum,
  approvalTypeEnum,
  caseStatusTypeEnum,
};

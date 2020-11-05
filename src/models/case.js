const { Model } = require('objection');

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
        beneficiaryId: { type: 'integer' },
        refereeId: { type: 'integer' },
        caseId: { type: 'integer' },
        requestType: { type: 'enum' },
        fulfilment: { type: 'enum' },
        POC: { type: 'varchar', maxLength: 255 },
        amountRequested: { type: 'decimal' },
        description: { type: 'varchar', maxLength: 255 },
        caseStatus: { type: 'enum' },
        referenceStatus: { type: 'enum' },
        approval: { type: 'enum' },
        amountGranted: { type: 'decimal' },
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

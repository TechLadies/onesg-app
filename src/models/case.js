const { Model, ValidationError } = require('objection');

const RequestTypeEnum = {
  cookedFood: 'cookedFood',
  diapers: 'diapers',
  financialAssistance: 'financialAssistance',
  medicalBill: 'medicalBill',
  milkFormula: 'milkFormula',
  schoolFees: 'schoolFees',
  transportationFees: 'transportationFees',
  utilityBill: 'utilityBill',
};

const FulfilmentTypeEnum = {
  inKindDonation: 'inKindDonation',
  cashTransfer: 'cashTransfer',
  thirdpartyPayment: 'third-partyPayment',
  partnerReferral: 'partnerReferral',
};

const CaseStatusTypeEnum = {
  new: 'new',
  onHold: 'onHold',
  referredtoEFC: 'referredtoEFC',
  processing: 'processing',
  closed: 'closed',
};

const ReferenceStatusTypeEnum = {
  unverified: 'unverified',
  pending: 'pending',
  verified: 'verified',
};
const ApprovalTypeEnum = {
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
      required: ['requestType', 'fulfilment', 'POC', 'amountRequested'],
      properties: {
        beneficiaryId: { type: 'integer' },
        refereeId: { type: 'integer' },
        caseId: { type: 'integer' },
        requestType: { type: 'string', enum: RequestTypeEnum.key },
        fulfilment: { type: 'string', enum: FulfilmentTypeEnum.key },
        POC: { type: 'string', minLength: 1, maxLength: 255 },
        amountRequested: { type: 'decimal' },
        description: { type: 'string', maxLength: 255 },
        caseStatus: { type: 'string', enum: CaseStatusTypeEnum.key },
        referenceStatus: { type: 'string', enum: ReferenceStatusTypeEnum.key },
        approval: { type: 'string', enum: ApprovalTypeEnum.key },
        amountGranted: { type: 'decimal' },
      },
    };
  }

  $afterValidate(json) {
    super.$afterValidate(json);
    const cases = json;
    // validate amountGranted < amountRequested
    if (typeof cases.amountRequested === 'string') {
      cases.amountRequested = parseFloat(json.amountRequested);
    }
    if (typeof cases.amountGranted === 'string') {
      cases.amountGranted = parseFloat(json.amountGranted);
    }
    if (cases.amountRequested - cases.amountGranted < 0) {
      throw new ValidationError({
        message: 'Amount granted cannot be more than amount requested',
      });
    }
  }
}

module.exports = {
  Case,
  model: Case,
  tableCase,
  RequestTypeEnum,
  FulfilmentTypeEnum,
  ReferenceStatusTypeEnum,
  ApprovalTypeEnum,
  CaseStatusTypeEnum,
};

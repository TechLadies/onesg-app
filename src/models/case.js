const { Model } = require('objection');

const RequestTypeEnum = {
  CookedFood: 'cookedFood',
  Diapers: 'diapers',
  FinancialAssistance: 'financialAssistance',
  MedicalBill: 'medicalBill',
  MilkFormula: 'milkFormula',
  SchoolFees: 'schoolFees',
  TransportationFees: 'transportationFees',
  UtilityBill: 'utilityBill',
};

const FulfilmentTypeEnum = {
  InKindDonation: 'inKindDonation',
  CashTransfer: 'cashTransfer',
  ThirdpartyPayment: 'third-partyPayment',
  PartnerReferral: 'partnerReferral',
};

const CaseStatusTypeEnum = {
  New: 'new',
  OnHold: 'onHold',
  ReferredtoEFC: 'referredtoEFC',
  Processing: 'processing',
  Closed: 'closed',
};

const ReferenceStatusTypeEnum = {
  Unverified: 'unverified',
  Pending: 'pending',
  Verified: 'verified',
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
  RequestTypeEnum,
  FulfilmentTypeEnum,
  ReferenceStatusTypeEnum,
  ApprovalTypeEnum,
  CaseStatusTypeEnum,
};

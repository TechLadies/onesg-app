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
        CaseId: { type: 'integer' },
        RequestType: { type: 'enum' },
        Fulfilment: { type: 'enum' },
        Poc: { type: 'varchar', maxLength: 255 },
        AmountRequested: { type: 'decimal' },
        Description: { type: 'varchar', maxLength: 255 },
        CaseStatus: { type: 'enum' },
        ReferenceStatus: { type: 'enum' },
        Approval: { type: 'enum' },
        AmountGranted: { type: 'decimal' },
        BeneficiaryId: { type: 'integer' },
        RefereeId: { type: 'integer' },
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

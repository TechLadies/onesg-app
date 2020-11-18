const { Model } = require('objection');

// const RequestTypeEnum = {
//   CookedFood: 'cookedFood',
//   Diapers: 'diapers',
//   FinancialAssistance: 'financialAssistance',
//   MedicalBill: 'medicalBill',
//   MilkFormula: 'milkFormula',
//   SchoolFees: 'schoolFees',
//   TransportationFees: 'transportationFees',
//   UtilityBill: 'utilityBill',
// };

// const FulfilmentTypeEnum = {
//   InKindDonation: 'inKindDonation',
//   CashTransfer: 'cashTransfer',
//   ThirdpartyPayment: 'third-partyPayment',
//   PartnerReferral: 'partnerReferral',
// };

// const CaseStatusTypeEnum = {
//   New: 'new',
//   OnHold: 'onHold',
//   ReferredtoEFC: 'referredtoEFC',
//   Processing: 'processing',
//   Closed: 'closed',
// };

// const ReferenceStatusTypeEnum = {
//   Unverified: 'unverified',
//   Pending: 'pending',
//   Verified: 'verified',
// };
// const ApprovalTypeEnum = {
//   NIL: '-',
//   full: 'full',
//   partial: 'partial',
//   rejected: 'rejected',
// };

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
        updateBy: { type: 'integer' },
      },
    };
  }
}

module.exports = {
  Case,
  model: Case,
  tableCase,
  // RequestTypeEnum,
  // FulfilmentTypeEnum,
  // ReferenceStatusTypeEnum,
  // ApprovalTypeEnum,
  // CaseStatusTypeEnum,
};

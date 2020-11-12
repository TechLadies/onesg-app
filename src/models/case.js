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

// helper functions
function getCaseId(previousId) {
  const [
    // eslint-disable-next-line no-unused-vars
    _,
    year,
    month,
    index,
  ] = previousId.match(/EF(\d{4})-(\d{2})(\d{4})/);

  const today = new Date();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const currentYear = today.getFullYear().toString();

  let caseIndex = 1;
  // If last inserted beneficiary is from the current month,
  // use counter from previous insert
  if (year === currentYear && month === currentMonth) {
    caseIndex = parseInt(index, 10) + 1;
  }

  // add leading 0s
  const paddedIndex = String(caseIndex).padStart(4, '0');

  return `EF${currentYear}-${currentMonth}${paddedIndex}`;
}

class Case extends Model {
  static get tableName() {
    return tableCase;
  }

  async $beforeInsert() {
    const lastInsertedCase = await Case.query()
      .select('caseId')
      .orderBy('created_at', 'desc')
      .limit(1);

    this.caseId = getCaseId(lastInsertedCase[0].caseId);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['requestType', 'fulfilment', 'POC', 'amountRequested'],
      properties: {
        beneficiaryId: { type: 'varchar' },
        refereeId: { type: 'varchar' },
        caseId: { type: 'varchar' },
        requestType: { type: 'varchar', enum: RequestTypeEnum.key },
        fulfilment: { type: 'varchar', enum: FulfilmentTypeEnum.key },
        POC: { type: 'varchar', minLength: 1, maxLength: 255 },
        amountRequested: { type: 'decimal' },
        description: { type: 'varchar', maxLength: 255 },
        caseStatus: { type: 'varchar', enum: CaseStatusTypeEnum.key },
        referenceStatus: { type: 'varchar', enum: ReferenceStatusTypeEnum.key },
        approval: { type: 'varchar', enum: ApprovalTypeEnum.key },
        amountGranted: { type: 'decimal' },
      },
    };
  }

  $afterValidate(json) {
    super.$afterValidate(json);
    const cases = json;
    // validate amountGranted must be <= amountRequested
    if (cases.amountGranted - cases.amountRequested > 0) {
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

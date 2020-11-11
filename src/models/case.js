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

  async $beforeInsert() {
    const knex = Case.knex();
    const increDB = await knex.raw(
      `SELECT CASE WHEN is_called THEN last_value + 1
      ELSE last_value
      END FROM "cases_id_seq";
      `
    );
    const increobj = increDB.rows[0].last_value;
    const i = `00${increobj}`.substring(increobj.length);
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = d.getMonth() + 1;
    const id = `EF ${yyyy}-${mm}${i}`;
    this.caseId = id;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['requestType', 'fulfilment', 'POC', 'amountRequested'],
      properties: {
        beneficiaryId: { type: 'integer' },
        refereeId: { type: 'integer' },
        caseId: { type: 'varchar' },
        requestType: { type: 'string', enum: RequestTypeEnum.key },
        fulfilment: { type: 'string', enum: FulfilmentTypeEnum.key },
        POC: { type: 'string', minLength: 1, maxLength: 255 },
        amountRequested: { type: 'decimal' },
        description: { type: 'varchar', maxLength: 255 },
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

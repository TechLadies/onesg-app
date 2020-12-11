const { ValidationError, Model } = require('objection');
const { Request } = require('./request');

const caseStatusEnum = ['NEW', 'PENDING', 'REFERRED', 'PROCESSING', 'CLOSED'];

const referenceStatusEnum = ['UNVERIFIED', 'PENDING', 'VERIFIED'];

const tableCase = 'case';

// helper functions
function getCaseNumber(previousNumber) {
  const [
    // eslint-disable-next-line no-unused-vars
    _,
    year,
    month,
    index,
  ] = previousNumber.match(/EF(\d{4})-(\d{2})(\d{3})/);

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
  const paddedIndex = String(caseIndex).padStart(3, '0');

  return `EF${currentYear}-${currentMonth}${paddedIndex}`;
}

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
      requests: {
        relation: Model.HasManyRelation,
        modelClass: Request,
        join: {
          from: 'case.id',
          to: 'request.caseId',
        },
      },
    };
  }

  async $beforeInsert() {
    const lastInsertedCase = await Case.query()
      .select('caseNumber')
      .orderBy('caseNumber', 'desc')
      .orderBy('createdAt', 'desc')
      .limit(1);

    this.caseNumber = getCaseNumber(lastInsertedCase[0].caseNumber);
  }

  $afterValidate(json) {
    super.$afterValidate(json);
    const cases = json;

    // if referenceStatus is pending, casePendingReason cannot be empty
    if (cases.referenceStatus === 'PENDING') {
      if (cases.casePendingReason === '' || cases.casePendingReason === null) {
        throw new ValidationError({
          message: 'Case pending reason required',
        });
      }
    }
  }
}

module.exports = {
  Case,
  model: Case,
  tableCase,
  caseStatusEnum,
  referenceStatusEnum,
};

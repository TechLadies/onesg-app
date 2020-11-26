const { ValidationError, Model } = require('objection');

const caseStatusEnum = ['NEW', 'PENDING', 'REFERRED', 'PROCESSING', 'CLOSED'];

const referenceStatusEnum = ['UNVERIFIED', 'PENDING', 'VERIFIED'];

const tableCase = 'case';

// helper functions
function getCaseId(previousId) {
  const [
    // eslint-disable-next-line no-unused-vars
    _,
    year,
    month,
    index,
  ] = previousId.match(/EF(\d{4})-(\d{2})(\d{3})/);

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

  async $beforeInsert() {
    const lastInsertedCase = await Case.query()
      .select('caseId')
      .orderBy('caseId', 'desc')
      .orderBy('createdAt', 'desc')
      .limit(1);

    this.caseId = getCaseId(lastInsertedCase[0].caseId);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['amountRequested', 'createdBy', 'updatedBy'],
      properties: {
        caseId: { type: 'string', minLength: 12, maxLength: 12 },
        caseStatus: { type: 'enum', enum: caseStatusEnum },
        appliedOn: { type: 'date' }, // 2018-11-13
        pointOfContact: { type: 'varchar', maxLength: 255 },
        referenceStatus: { type: 'enum', enum: referenceStatusEnum },
        casePendingReason: { type: 'varchar', maxLength: 255 },
        amountRequested: { type: 'decimal', maxLength: 8 },
        amountGranted: { type: 'decimal', maxLength: 8 },
        refereeId: { type: 'varchar', minLength: 11, maxLength: 11 },
        beneficiaryId: { type: 'varchar', minLength: 11, maxLength: 11 },
        createdBy: { type: 'integer' },
        updatedBy: { type: 'integer' },
      },
    };
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

    // validate amountGranted must be <= amountRequested
    if (cases.amountGranted > cases.amountRequested) {
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
  caseStatusEnum,
  referenceStatusEnum,
};

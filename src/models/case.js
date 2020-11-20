const { Model } = require('objection');

const caseStatusEnum = {
  new: 'NEW',
  pending: 'PENDING',
  referred: 'REFERRED',
  processing: 'PROCESSING',
  closed: 'CLOSED',
};

const referenceStatusEnum = {
  unverified: 'UNVERIFIED',
  pending: 'PENDING',
  verified: 'VERIFIED',
};

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
  const currentMonth = (today.getMonth() + 1).toString().padStart(3, '0');
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
      properties: {
        caseId: { type: 'varchar', minLength: 11, maxLength: 11 },
        caseStatus: { type: 'enum', enum: caseStatusEnum },
        appliedOn: { type: 'date' }, // 2018-11-13
        pointOfContact: { type: 'varchar', maxLength: 255 },
        referenceStatus: { type: 'enum', enum: referenceStatusEnum },
        pendingStatusReason: { type: 'varchar', maxLength: 255 },
        amountRequested: { type: 'decimal', maxLength: 8, multipleOf: '1.00' },
        amountGranted: { type: 'decimal', maxLength: 8, multipleOf: '1.00' },
        documents: { type: 'array' },
        refereeId: { type: 'varchar', minLength: 11, maxLength: 11 },
        beneficiaryId: { type: 'varchar', minLength: 11, maxLength: 11 },
        createdBy: { type: 'integer' },
        updatedBy: { type: 'integer' },
      },
    };
  }
}

module.exports = {
  Case,
  model: Case,
  tableCase,
  caseStatusEnum,
  referenceStatusEnum,
};

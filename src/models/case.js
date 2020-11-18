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

const tableCase = 'cases';

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
        caseId: { type: 'varchar' },
        caseStatus: { type: 'enum' },
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

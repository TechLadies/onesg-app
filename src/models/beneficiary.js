/* eslint-disable global-require */

const { Model, ValidationError } = require('objection');
const { Case } = require('./case');
const { Referee } = require('./referee');

const paymentTypeEnum = {
  PayNow: 'payNow',
  BankTransfer: 'bankTransfer',
};

const tableBeneficiary = 'beneficiary';

// helper functions
function getBeneficiaryId(previousId) {
  const [
    // eslint-disable-next-line no-unused-vars
    _,
    year,
    month,
    index,
  ] = previousId.match(/B(\d{4})(\d{2})-(\d{4})/);

  const today = new Date();
  const currentMonth = (today.getMonth() + 1).toString();
  const currentYear = today.getFullYear().toString();

  let beneficiaryIndex = 1;
  // If last inserted beneficiary is from the current month,
  // use counter from previous insert
  if (year === currentYear && month === currentMonth) {
    beneficiaryIndex = parseInt(index, 10) + 1;
  }

  // add leading 0s
  const paddedIndex = String(beneficiaryIndex).padStart(4, '0');

  return `B${currentYear}${currentMonth}-${paddedIndex}`;
}

class Beneficiary extends Model {
  static get tableName() {
    return tableBeneficiary;
  }

  async $beforeInsert() {
    const lastInsertedBeneficiary = await Beneficiary.query()
      .select('beneficiaryId')
      .orderBy('id', 'desc')
      .limit(1);

    this.beneficiaryId = getBeneficiaryId(
      lastInsertedBeneficiary[0].beneficiaryId
    );
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'name', 'phone'],
      properties: {
        beneficiaryId: { type: 'varchar' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        phone: {
          type: 'varchar',
          minLength: 8,
          maxLength: 8,
        },
        occupation: { type: 'string', maxLength: 255 },
        notes: { type: 'text', maxLength: 255 },
        householdIncome: { type: 'decimal', minLength: 1 },
        householdSize: { type: 'integer' },
        paymentType: { type: 'enum' },
      },
    };
  }

  static get relationMappings() {
    return {
      cases: {
        relation: Model.HasManyRelation,
        modelClass: Case,
        join: {
          from: 'beneficiary.beneficiaryId',
          to: 'cases.beneficiaryId',
        },
      },
      referees: {
        relation: Model.ManyToManyRelation,
        modelClass: Referee,
        join: {
          from: 'beneficiary.beneficiaryId',
          through: {
            // persons_movies is the join table.
            from: 'cases.beneficiaryId',
            to: 'cases.refereeId',
          },
          to: 'referees.refereeId',
        },
      },
    };
  }

  $afterValidate(beneficiary) {
    super.$afterValidate(beneficiary);

    // validate email
    if (beneficiary.email !== undefined && beneficiary.email !== null) {
      if (
        /^[\w-.]+@([\w-]+\.)+[A-Za-z]{2,}$/.test(beneficiary.email) === false
      ) {
        throw new ValidationError({
          message: `Email format "${beneficiary.email}" is invalid`,
        });
      }
    }
    // validate phone
    if (beneficiary.phone !== undefined && beneficiary.phone !== null) {
      if (/^(6|8|9)\d{7}$/.test(beneficiary.phone) === false) {
        throw new ValidationError({
          message: `Phone format "${beneficiary.phone}" is invalid. Must be numeric and start with 6, 8 or 9`,
        });
      }
    }
  }
}

module.exports = {
  model: Beneficiary,
  tableBeneficiary,
  paymentTypeEnum,
};

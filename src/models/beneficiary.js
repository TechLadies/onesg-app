const { Model, ValidationError } = require('objection');

const tableBeneficiary = 'beneficiary';

// helper functions
function getBeneficiaryId(previousId) {
  const [
    // eslint-disable-next-line no-unused-vars
    _,
    year,
    month,
    index,
  ] = previousId.match(/B(\d{4})-(\d{2})(\d{3})/);
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
  const paddedIndex = String(beneficiaryIndex).padStart(3, '0');
  return `B${currentYear}-${currentMonth}${paddedIndex}`;
}

function newBeneficiaryId() {
  const today = new Date();
  const currentMonth = (today.getMonth() + 1).toString();
  const currentYear = today.getFullYear().toString();
  const beneficiaryIndex = 1;
  // add leading 0s
  const paddedIndex = String(beneficiaryIndex).padStart(3, '0');
  return `B${currentYear}-${currentMonth}${paddedIndex}`;
}
class Beneficiary extends Model {
  static get tableName() {
    return tableBeneficiary;
  }

  async $beforeInsert() {
    const lastInsertedBeneficiary = await Beneficiary.query()
      .select('beneficiaryNumber')
      .orderBy('id', 'desc')
      .limit(1);

    if (lastInsertedBeneficiary[0]) {
      this.beneficiaryNumber = getBeneficiaryId(
        lastInsertedBeneficiary[0].beneficiaryNumber
      );
    } else {
      this.beneficiaryNumber = newBeneficiaryId(Beneficiary.beneficiaryNumber);
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'phone', 'createdBy', 'updatedBy'],
      properties: {
        beneficiaryNumber: {
          type: 'string',
          minLength: 11,
          maxLength: 11,
          $comment: 'Format: BYYYY-MM999',
        },
        name: { type: 'string', maxLength: 100 },
        email: { type: 'string', maxLength: 50 },
        phone: { type: 'string', minLength: 8, maxLength: 8 },
        address: { type: 'string', maxLength: 255 },
        occupation: { type: 'string', maxLength: 50 },
        householdIncome: {
          type: 'number',
        },
        householdSize: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      cases: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Case`,
        join: {
          from: 'beneficiary.id',
          to: 'case.beneficiaryId',
        },
      },
      referees: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/Referee`,
        join: {
          from: 'beneficiary.id',
          through: {
            // persons_movies is the join table.
            from: 'case.beneficiaryId',
            to: 'case.refereeId',
          },
          to: 'referee.id',
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
  Beneficiary,
  model: Beneficiary,
  tableBeneficiary,
};

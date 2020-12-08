/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

const paymentTypeEnum = ['PAYNOW', 'BANK_TRANSFER'];

// helper functions
function getBeneficiaryNumber(previousNumber) {
  const [
    // eslint-disable-next-line no-unused-vars
    _,
    year,
    month,
    index,
  ] = previousNumber.match(/B(\d{4})-(\d{2})(\d{3})/);

  const today = new Date();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
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

const tableBeneficiary = 'beneficiary';

class Beneficiary extends Model {
  static get tableName() {
    return tableBeneficiary;
  }

  async $beforeInsert() {
    const lastInsertedBeneficiary = await Beneficiary.query()
      .select('beneficiaryNumber')
      .orderBy('createdAt', 'desc')
      .orderBy('beneficiaryNumber', 'desc')
      .limit(1);

    this.beneficiaryNumber = getBeneficiaryNumber(
      lastInsertedBeneficiary[0].beneficiaryNumber
    );
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
        paymentType: {
          type: 'array',
          $comment:
            'Expected value of the array element is from paymentTypeEnum',
        },
        notes: { type: 'string' },
        createdBy: { type: 'integer' },
        updatedBy: { type: 'integer' },
      },
    };
  }

  $afterValidate(json) {
    super.$afterValidate(json);
    const beneficiary = json;
    const paymentList = beneficiary.paymentTypeList;

    paymentList.every((i) => paymentTypeEnum.includes(i));
  }
}

module.exports = {
  Beneficiary,
  model: Beneficiary,
  tableBeneficiary,
  paymentTypeEnum,
};

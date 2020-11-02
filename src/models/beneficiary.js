const { Model } = require('objection');

const paymentTypeEnum = {
  PayNow: 'payNow',
  BankTransfer: 'bankTransfer',
};

const tableBeneficiary = 'Beneficiary';

class Beneficiary extends Model {
  static get tableName() {
    return tableBeneficiary;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'name', 'phone'],
      properties: {
        beneficiaryId: { type: 'varchar' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        phone: { type: 'varchar', maxLength: 12 },
        address: { type: 'varchar', maxLength: 255 },
        occupation: { type: 'string', maxLength: 255 },
        householdIncome: { type: 'decimal', minLength: 1 },
        householdSize: { type: 'integer' },
        paymentType: { type: 'enum' },
      },
    };
  }
}

module.exports = {
  Beneficiary,
  model: Beneficiary,
  tableBeneficiary,
  paymentTypeEnum,
};

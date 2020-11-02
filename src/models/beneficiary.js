const { Model } = require('objection');

const PaymentTypeEnum = {
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
      required: ['Email', 'Name', 'Phone'],
      properties: {
        beneficiaryId: { type: 'varchar' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { maxLength: 255 },
        phone: { type: 'varchar', maxLength: 12 },
        occupation: { type: 'string', maxLength: 255 },
        householdIncome: { type: 'decimal', minLength: 1 },
        householdSize: { type: 'varchar' },
        paymentType: { type: 'enum' },
      },
    };
  }
}

module.exports = {
  Beneficiary,
  model: Beneficiary,
  tableBeneficiary,
  PaymentTypeEnum,
};

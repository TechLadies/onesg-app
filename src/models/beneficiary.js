const { Model } = require('objection');

const PaymentTypeEnum = {
  PayNow: 'payNow',
  BankTransfer: 'bankTransfer',
};

const tableBeneficiary = 'beneficiary';

class Beneficiary extends Model {
  static get tableName() {
    return tableBeneficiary;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['Email', 'Name', 'Phone'],
      properties: {
        BeneficiaryId: { type: 'integer' },
        Name: { type: 'string', minLength: 1, maxLength: 255 },
        Email: { type: 'string', minLength: 1, maxLength: 255 },
        Phone: { type: 'varchar', maxLength: 12 },
        Occupation: { type: 'string', maxLength: 255 },
        HouseholdIncome: { type: 'decimal', minLength: 1 },
        HouseholdSize: { type: 'integer' },
        PaymentType: { type: 'enum' },
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

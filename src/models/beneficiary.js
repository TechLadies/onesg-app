/* eslint-disable no-console */
const { Model, ValidationError } = require('objection');

const paymentTypeEnum = {
  PayNow: 'payNow',
  BankTransfer: 'bankTransfer',
};

const tableBeneficiary = 'beneficiary';

class Beneficiary extends Model {
  static get tableName() {
    return tableBeneficiary;
  }

  async $beforeInsert() {
    const knex = Beneficiary.knex();
    const increDB = await knex.raw(
      `SELECT CASE WHEN is_called THEN last_value + 1
       ELSE last_value
       END FROM "beneficiary_benId_seq";
       `
    );
    const increobj = increDB.rows[0].last_value;
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = d.getMonth();
    const id = `B${yyyy}${mm}-${increobj}`;
    this.beneficiaryId = id;
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
        occupation: { type: 'string', maxLength: 255 },
        householdIncome: { type: 'decimal', minLength: 1 },
        householdSize: { type: 'integer' },
        paymentType: { type: 'enum' },
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
  paymentTypeEnum,
};

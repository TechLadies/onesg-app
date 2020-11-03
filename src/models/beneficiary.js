/* eslint-disable no-console */
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

  async $beforeInsert() {
    const knex = Beneficiary.knex();
    const increDB = await knex.raw(
      `SELECT CASE WHEN is_called THEN last_value + 1 
      ELSE last_value END FROM "beneficiary_BenId_seq"`
      // `SELECT nextval(pg_get_serial_sequence('Beneficiary', 'BenId'))`
    );
    const increobj = JSON.stringify(increDB.rows[0].last_value);
    // eslint-disable-next-line radix
    const increment = +increobj;

    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = d.getMonth();
    const id = `B${yyyy}${mm}-${increment}`;
    this.BeneficiaryId = id;
    // eslint-disable-next-line dot-notation
    console.log(typeof increment);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['Email', 'Name', 'Phone'],
      properties: {
        BeneficiaryId: { type: 'varchar' },
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

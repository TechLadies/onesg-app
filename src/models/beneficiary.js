<<<<<<< HEAD
/* eslint-disable strict */
=======
/* eslint-disable no-console */
const { Model } = require('objection');
>>>>>>> add format for ben id

'use strict';

const { Model } = require('objection');

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
}

module.exports = {
  Beneficiary,
  model: Beneficiary,
  tableBeneficiary,
};

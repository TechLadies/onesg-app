/* eslint-disable strict */

'use strict';

const { Model, ValidationError } = require('objection');

const tableReferee = 'referees';
class Referee extends Model {
  static get tableName() {
    return tableReferee;
  }

  async $beforeInsert() {
    const knex = Referee.knex();
    const increDB = await knex.raw(
      `SELECT CASE WHEN is_called THEN last_value + 1
      ELSE last_value
      END FROM "referees_refId_seq";
      `
    );
    const increobj = increDB.rows[0].last_value;
    const i = `0000${increobj}`.substring(increobj.length);
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = d.getMonth() + 1;
    const id = `R${yyyy}${mm}-${i}`;
    this.refereeId = id;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'phone'],
      properties: {
        refereeId: { type: 'varchar' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { maxLength: 255 },
        phone: {
          type: 'varchar',
          minLength: 8,
          maxLength: 8,
        },
        organisation: { type: 'varchar', maxLength: 255 },
      },
    };
  }

  $afterValidate(referee) {
    super.$afterValidate(referee);

    // validate email
    if (referee.email !== undefined && referee.email !== null) {
      if (/^[\w-.]+@([\w-]+\.)+[A-Za-z]{2,}$/.test(referee.email) === false) {
        throw new ValidationError({
          message: `Email format "${referee.email}" is invalid`,
        });
      }
    }
    // validate phone
    if (referee.phone !== undefined && referee.phone !== null) {
      if (/^(6|8|9)\d{7}$/.test(referee.phone) === false) {
        throw new ValidationError({
          message: `Phone format "${referee.phone}" is invalid. Must be numeric and start with 6, 8 or 9`,
        });
      }
    }
  }
}

module.exports = {
  Referee,
  model: Referee,
  tableReferee,
};

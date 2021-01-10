/* eslint-disable strict */

'use strict';

const { Model, ValidationError } = require('objection');

// helper functions
function getRefereeNumber(previousNumber) {
  const [
    // eslint-disable-next-line no-unused-vars
    _,
    year,
    month,
    index,
  ] = previousNumber.match(/R(\d{4})-(\d{2})(\d{3})/);

  const today = new Date();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const currentYear = today.getFullYear().toString();

  let refereeIndex = 1;
  // If last inserted beneficiary is from the current month,
  // use counter from previous insert
  if (year === currentYear && month === currentMonth) {
    refereeIndex = parseInt(index, 10) + 1;
  }

  // add leading 0s
  const paddedIndex = String(refereeIndex).padStart(3, '0');

  return `R${currentYear}-${currentMonth}${paddedIndex}`;
}

const tableReferee = 'referee';
class Referee extends Model {
  static get tableName() {
    return tableReferee;
  }

  async $beforeInsert() {
    const lastInsertedReferee = await Referee.query()
      .select('refereeNumber')
      .orderBy('createdAt', 'desc')
      .orderBy('refereeNumber', 'desc')
      .limit(1);

    this.refereeNumber = getRefereeNumber(lastInsertedReferee[0].refereeNumber);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'phone'],
      properties: {
        refereeNumber: { type: 'string', $comment: 'Format: RYYYY-MM999' },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        email: { type: ['string', 'null'], maxLength: 50 },
        phone: {
          type: 'string',
          minLength: 8,
          maxLength: 8,
        },
        organisation: { type: ['string', 'null'], maxLength: 100 },
        createdBy: { type: 'integer' },
        updatedBy: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      cases: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Case`,
        join: {
          from: 'referee.id',
          to: 'case.refereeId',
        },
      },
      beneficiary: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/Beneficiary`,
        join: {
          from: 'referee.id',
          through: {
            from: 'case.refereeId',
            to: 'case.beneficiaryId',
          },
          to: 'beneficiary.id',
        },
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

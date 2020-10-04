/* eslint-disable no-unused-vars */
const { Model } = require('objection')

const Knex = require('knex')

const tableCase = 'cases'

class Case extends Model {
  static get tableName() {
    return tableCase
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        CaseId: { type: 'integer' },
        RequestType: { type: 'enum' },
        Fulfilment: { type: 'enum' },
        Description: { type: 'varchar', maxLength: 255 },
        CaseStatus: { type: 'enum' },
        ReferenceStatus: { type: 'enum' },
        Approval: { type: 'enum' },
        AmountGranted: { type: 'decimal' },
        BeneficiaryId: { type: 'integer' },
        RefereeId: { type: 'integer' },
      },
    }
  }
}

module.exports = {
  Case,
  model: Case,
  tableCase,
}

const { Model } = require('objection')

const tableUser = 'users'

class User extends Model {
  static get tableName() {
    return tableUser
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'Name', 'phone'],
      properties: {
        BeneficiaryId: { type: 'integer' },
        RefereeId: { type: ['integer', 'null'] },
        Name: { type: 'string', minLength: 1, maxLength: 255 },
        Email: { type: 'string', minLength: 1, maxLength: 255 },
        Phone: { type: 'varchar', maxLength: 12 },
        Address: { type: 'varchar', maxLength: 255 },
        occupation: { type: 'string', maxLength: 255 },
        MaritalStatus: { type: 'enum' },
        Income: { type: 'decimal', minLength: 1 },
        CaseId: { type: 'integer' },
      },
    }
  }
}

module.exports = {
  User,
  model: User,
  tableUser,
}

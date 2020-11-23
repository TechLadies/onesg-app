const { tableRequestType } = require('../src/models/requestType.js');

exports.seed = function seedRequestTypeTable(knex) {
  // Deletes ALL existing entries
  return knex(tableRequestType)
    .del()
    .then(function insertRequestTypes() {
      // Inserts seed entries
      return knex(tableRequestType).insert([
        {
          id: '1',
          description: 'COOKED_FOOD',
        },
        {
          id: '2',
          description: 'DIAPERS',
        },
        {
          id: '3',
          description: 'FINANCIAL_ASSISTANCE',
        },
        {
          id: '4',
          description: 'MEDICAL_BILL',
        },
        {
          id: '5',
          description: 'MILK_FORMULA',
        },
        {
          id: '6',
          description: 'SCHOOL_FEES',
        },
        {
          id: '7',
          description: 'TRANSPORTATION_FEES',
        },
      ]);
    });
};

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
          requestTypeName: 'COOKED_FOOD',
        },
        {
          id: '2',
          requestTypeName: 'DIAPERS',
        },
        {
          id: '3',
          requestTypeName: 'FINANCIAL_ASSISTANCE',
        },
        {
          id: '4',
          requestTypeName: 'MEDICAL_BILL',
        },
        {
          id: '5',
          requestTypeName: 'MILK_FORMULA',
        },
        {
          id: '6',
          requestTypeName: 'SCHOOL_FEES',
        },
        {
          id: '7',
          requestTypeName: 'TRANSPORTATION_FEES',
        },
      ]);
    });
};

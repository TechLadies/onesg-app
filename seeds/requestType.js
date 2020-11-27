const { tableRequestType } = require('../src/models/requestType.js');

exports.seed = function seedRequestTypeTable(knex) {
  // Deletes ALL existing entries
  return knex(tableRequestType)
    .del()
    .then(function insertRequestTypes() {
      // Inserts seed entries
      return knex(tableRequestType).insert([
        {
          fieldName: 'Cooked Food',
        },
        {
          fieldName: 'Diapers',
        },
        {
          fieldName: 'Finanacial Assistance',
        },
        {
          fieldName: 'Medical Bill',
        },
        {
          fieldName: 'Milk Formula',
        },
        {
          fieldName: 'School Fees',
        },
        {
          fieldName: 'Transportation Fees',
        },
      ]);
    });
};

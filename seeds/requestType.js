const { tableRequestType } = require('../src/models/requestType.js');

exports.seed = function seedRequestTypeTable(knex) {
  // Deletes ALL existing entries
  return knex(tableRequestType)
    .del()
    .then(function insertRequestTypes() {
      // Inserts seed entries
      return knex(tableRequestType).insert([
        {
          type: 'Cooked Food',
        },
        {
          type: 'Diapers',
        },
        {
          type: 'Finanacial Assistance',
        },
        {
          type: 'Medical Bill',
        },
        {
          type: 'Milk Formula',
        },
        {
          type: 'School Fees',
        },
        {
          type: 'Transportation Fees',
        },
      ]);
    });
};

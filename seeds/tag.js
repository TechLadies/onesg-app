const { tableTag } = require('../src/models/tag.js');

exports.seed = function seedTagTable(knex) {
  // Deletes ALL existing entries
  return knex(tableTag)
    .del()
    .then(function insertTags() {
      // Inserts seed entries
      return knex(tableTag).insert([
        {
          name: 'Tag 1',
        },
        {
          name: 'Tag 2',
        },
      ]);
    });
};

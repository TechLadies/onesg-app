const { tableCase } = require('../src/models/case.js');
const { tableBeneficiary } = require('../src/models/beneficiary.js');
const { tableReferee } = require('../src/models/referee.js');
const {
  RequestTypeEnum,
  FulfilmentTypeEnum,
  CaseStatusTypeEnum,
  ReferenceStatusTypeEnum,
  ApprovalTypeEnum,
} = require('../src/models/case.js');

exports.up = function makeCasetable(knex) {
  return knex.schema.createTable(tableCase, (table) => {
<<<<<<< HEAD
    table.increments('CaseId').primary();
    table.enum('RequestType', Object.values(RequestTypeEnum));
    table.enum('Fulfilment', Object.values(FulfilmentTypeEnum));
    table.text('POC');
    table.decimal('AmountRequested');
    table.text('Description');
    table.enum('CaseStatus', Object.values(CaseStatusTypeEnum));
    table.enum('Approval', Object.values(ApprovalTypeEnum));
    table.enum('ReferenceStatus', Object.values(ReferenceStatusTypeEnum));
    table.decimal('AmountGranted');
=======
>>>>>>> changed db to postgres & tested with referee
    table
      .bigInteger('BeneficiaryId')
      .unsigned()
      .index()
      .references('BeneficiaryId')
<<<<<<< HEAD
      .inTable(tableBeneficiary);
=======
      .inTable(tableBeneficiary)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
>>>>>>> changed db to postgres & tested with referee
    table
      .bigInteger('RefereeId')
      .unsigned()
      .index()
      .references('RefereeId')
<<<<<<< HEAD
      .inTable(tableReferee);
    table.timestamps(true, true);
  });
};
=======
      .inTable(tableReferee)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.enum('RequestType', Object.values(RequestTypeEnum))
    table.enum('Fulfilment', Object.values(FulfilmentTypeEnum))
    table.text('POC')
    table.decimal('AmountRequested')
    table.text('Description')
    table.enum('CaseStatus', Object.values(CaseStatusTypeEnum))
    table.enum('Approval', Object.values(ApprovalTypeEnum))
    table.enum('ReferenceStatus', Object.values(ReferenceStatusTypeEnum))
    table.decimal('AmountGranted')
    table.increments('CaseId').primary()
    table.timestamps(true, true)
  })
}
>>>>>>> changed db to postgres & tested with referee

exports.down = function exportCasetable(knex) {
  return knex.schema.dropTable(tableCase);
};

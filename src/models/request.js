/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

const fulfilmentTypeEnum = {
  inKindDonation: 'IN_KIND_DONATION',
  partnerReferral: 'PARTNER_REFERRAL',
  thirdPartyPayment: 'THIRD_PARTY_PAYMENT',
  cashTransfer: 'CASH_TRANSFER',
};

const requestStatusEnum = {
  accept: 'ACCEPT',
  reject: 'REJECT',
};

const tableRequest = 'request';
class Request extends Model {
  static get tableName() {
    return tableRequest;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        caseId: { type: 'varchar' },
        requestTypeId: { type: 'integer' },
        fulfilmentType: { type: 'enum' },
        fulfilmentChecklist: { type: 'string' }, // type: ['array', 'enum']
        description: { type: 'varchar' },
        requestStatus: { type: 'enum' },
        approvedOn: { type: 'date' },
        completedOn: { type: 'date' },
      },
    };
  }
}

module.exports = {
  Request,
  model: Request,
  tableRequest,
  fulfilmentTypeEnum,
  requestStatusEnum,
};

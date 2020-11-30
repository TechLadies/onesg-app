/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

const fulfilmentTypeEnum = [
  'IN_KIND_DONATION',
  'PARTNER_REFERRAL',
  'THIRD_PARTY_PAYMENT',
  'CASH_TRANSFER',
];

// // const x = ['ITEMS_PURCHASED', 'REFERRED_TO_PARTNER'];

// // const result = x.every((i) =>
// //   fulfilmentChecklistEnum.inKindDonation.includes(i)
// // );

const fulfilmentChecklistEnum = [
  [
    'ITEMS_PURCHASED',
    'PURCHASE_AND_REIMBURSEMENT',
    'REIMBURSEMENT_PAID',
    'DELIVERED_TO_BENEFICIARY',
  ],
  ['REFERRED_TO_PARTNER', 'REFERRAL_APPROVED', 'DELIVERED_TO_BENEFICIARY'],
  ['PURCHASE_VOUCHER', 'PAYMENT_PROCESSED'],
];

const requestStatusEnum = ['ACCEPTED', 'REJECTED', 'UNDER_REVIEW'];

const tableRequest = 'request';
class Request extends Model {
  static get tableName() {
    return tableRequest;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['requestTypeId', 'fulfilmentType', 'requestStatus'],
      properties: {
        requestTypeId: {
          type: 'integer',
          $comment: 'Id for the type of request',
        },
        fulfilmentType: {
          type: 'string',
          enum: fulfilmentTypeEnum,
          $comment:
            'Lists items that have been checked off from the fulfilment type checklist',
        },
        completedFulfilmentItems: {
          type: 'enum',
          enum: fulfilmentChecklistEnum,
        },
        description: { type: 'string', maxLength: 255 },
        requestStatus: { type: 'enum', enum: requestStatusEnum },
        reviewedOn: { type: 'date' },
        fulfilledOn: { type: 'date' },
        caseId: { type: 'integer' },
      },
    };
  }
}

module.exports = {
  Request,
  model: Request,
  tableRequest,
  fulfilmentTypeEnum,
  fulfilmentChecklistEnum,
  requestStatusEnum,
};

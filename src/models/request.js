/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

const fulfilmentTypeEnum = {
  inKindDonation: 'IN_KIND_DONATION',
  partnerReferral: 'PARTNER_REFERRAL',
  thirdPartyPayment: 'THIRD_PARTY_PAYMENT',
  cashTransfer: 'CASH_TRANSFER',
};

const fulfilmentChecklistEnum = {
  inKindDonation: [
    'ITEMS_PURCHASED',
    'PURCHASE_AND_REIMBURSEMENT',
    'REIMBURSEMENT_PAID',
    'DELIVERED_TO_BENEFICIARY',
  ],
  partnerReferral: [
    'REFERRED_TO_PARTNER',
    'REFERRAL_APPROVED',
    'DELIVERED_TO_BENEFICIARY',
  ],
  thirdPartyPayment: ['PURCHASE_VOUCHER', 'PAYMENT_PROCESSED'],
  cashTransfer: ['PURCHASE_VOUCHER', 'PAYMENT_PROCESSED'],
};

// const x = ['ITEMS_PURCHASED', 'REFERRED_TO_PARTNER'];

// const result = x.every((i) =>
//   fulfilmentChecklistEnum.inKindDonation.includes(i)
// );

const requestStatusEnum = {
  accept: 'ACCEPT',
  reject: 'REJECT',
  notReviewd: 'NOT_REVIEWED',
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
        caseId: { type: 'varchar', minLength: 11, maxLength: 11 },
        requestTypeId: { type: 'integer' },
        fulfilmentType: { type: 'enum', enum: fulfilmentTypeEnum },
        completedFulfilmentItems: {
          type: 'array',
        },
        description: { type: 'varchar' },
        requestStatus: { type: 'enum', enum: requestStatusEnum },
        reviewedOn: { type: 'date' },
        fulfilledOn: { type: 'date' },
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

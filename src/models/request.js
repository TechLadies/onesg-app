/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

const fulfilmentTypeEnum = [
  'IN_KIND_DONATION',
  'PARTNER_REFERRAL',
  'THIRD_PARTY_PAYMENT',
  'CASH_TRANSFER',
];

// // const fulfilmentChecklistEnum = {
// //   inKindDonation: [
// //     'ITEMS_PURCHASED',
// //     'PURCHASE_AND_REIMBURSEMENT',
// //     'REIMBURSEMENT_PAID',
// //     'DELIVERED_TO_BENEFICIARY',
// //   ],
// //   partnerReferral: [
// //     'REFERRED_TO_PARTNER',
// //     'REFERRAL_APPROVED',
// //     'DELIVERED_TO_BENEFICIARY',
// //   ],
// //   thirdPartyPayment: ['PURCHASE_VOUCHER', 'PAYMENT_PROCESSED'],
// //   cashTransfer: ['PURCHASE_VOUCHER', 'PAYMENT_PROCESSED'],
// // };

// // const x = ['ITEMS_PURCHASED', 'REFERRED_TO_PARTNER'];

// // const result = x.every((i) =>
// //   fulfilmentChecklistEnum.inKindDonation.includes(i)
// // );

const fulfilmentChecklistEnum = [
  {
    itemsPurchase: 'ITEMS_PURCHASED',
    purchaseAndReimbursement: 'PURCHASE_AND_REIMBURSEMENT',
    reimbursementPaid: 'REIMBURSEMENT_PAID',
    deliveredToBeneficiary: 'DELIVERED_TO_BENEFICIARY',
  },
  {
    referredToPartner: 'REFERRED_TO_PARTNER',
    referralApproved: 'REFERRAL_APPROVED',
    deliveredToBeneficiary: 'DELIVERED_TO_BENEFICIARY',
  },
  {
    purchaseVoucher: 'PURCHASE_VOUCHER',
    paymentProcessed: 'PAYMENT_PROCESSED',
  },
];

const requestStatusEnum = ['ACCEPT', 'REJECT', 'NOT_REVIEWED'];

const tableRequest = 'request';
class Request extends Model {
  static get tableName() {
    return tableRequest;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        caseId: { type: 'varchar', minLength: 12, maxLength: 12 },
        requestTypeId: { type: 'integer' },
        fulfilmentType: { type: 'enum', enum: fulfilmentTypeEnum },
        completedFulfilmentItems: {
          type: 'enum',
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

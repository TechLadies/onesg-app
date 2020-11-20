/* eslint-disable strict */

'use strict';

const { Model } = require('objection');

const fulfilmentTypeEnum = {
  inKindDonation: 'IN_KIND_DONATION',
  partnerReferral: 'PARTNER_REFERRAL',
  thirdPartyPayment: 'THIRD_PARTY_PAYMENT',
  cashTransfer: 'CASH_TRANSFER',
};

const fulfilmentChecklistEnum = [
  {
    itemsPurchased: 'ITEMS_PURCHASED',
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
        caseId: { type: 'varchar', minLength: 11, maxLength: 11 },
        requestTypeId: { type: 'integer' },
        fulfilmentType: { type: 'enum', enum: fulfilmentTypeEnum },
        fulfilmentChecklist: { type: 'array', enum: fulfilmentChecklistEnum },
        description: { type: 'varchar' },
        requestStatus: { type: 'enum', enum: requestStatusEnum },
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
  fulfilmentChecklistEnum,
  requestStatusEnum,
};

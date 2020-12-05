/* eslint-disable strict */

'use strict';

const { Model, ValidationError } = require('objection');
const { RequestType } = require('./requestType');

const fulfilmentTypeEnum = [
  'IN_KIND_DONATION',
  'PARTNER_REFERRAL',
  'THIRD_PARTY_PAYMENT',
  'CASH_TRANSFER',
];

// checklist items associated with fulfilment type
const fulfilmentChecklistEnum = [
  {
    IN_KIND_DONATION: [
      'ITEMS_PURCHASED',
      'PURCHASE_AND_REIMBURSEMENT',
      'REIMBURSEMENT_PAID',
      'DELIVERED_TO_BENEFICIARY',
    ],
  },
  {
    PARTNER_REFERRAL: [
      'REFERRED_TO_PARTNER',
      'REFERRAL_APPROVED',
      'DELIVERED_TO_BENEFICIARY',
    ],
  },
  { THIRD_PARTY_PAYMENT: ['PURCHASE_VOUCHER', 'PAYMENT_PROCESSED'] },
  { CASH_TRANSFER: ['PURCHASE_VOUCHER', 'PAYMENT_PROCESSED'] },
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
        description: { type: 'string', maxLength: 255 },
        requestStatus: { type: 'enum', enum: requestStatusEnum },
        reviewedOn: { type: 'date' },
        fulfilledOn: { type: 'date' },
        caseId: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      requestType: {
        relation: Model.BelongsToOneRelation,
        modelClass: RequestType,
        join: {
          from: 'request.requestTypeId',
          to: 'requestType.id',
        },
      },
      requests: {
        relation: Model.BelongsToOneRelation,
        modelClass: Request,
        join: {
          from: 'request.caseId',
          to: 'case.id',
        },
      },
    };
  }

  $afterValidate(json) {
    super.$afterValidate(json);
    const request = json;

    const requestChecklist = request.completedFulfilmentItems;

    if (request.fulfilmentType === 'IN_KIND_DONATION') {
      const result = requestChecklist.every((i) =>
        fulfilmentChecklistEnum[0].includes(i)
      );
      if (result === false) {
        throw new ValidationError({
          message: `${requestChecklist} is not part of ${request.fulfilmentType}`,
        });
      }
    }

    if (request.fulfilmentType === 'PARTNER_REFERRAL') {
      const result = requestChecklist.every((i) =>
        fulfilmentChecklistEnum[1].includes(i)
      );
      if (result === false) {
        throw new ValidationError({
          message: `${requestChecklist} is not part of ${request.fulfilmentType}`,
        });
      }
    }

    if (
      request.fulfilmentType === 'THIRD_PARTY_PAYMENT' ||
      request.fulfilmentType === 'CASH_TRANSFER'
    ) {
      const result = requestChecklist.every((i) =>
        fulfilmentChecklistEnum[2].includes(i)
      );
      if (result === false) {
        throw new ValidationError({
          message: `${requestChecklist} is not part of ${request.fulfilmentType}`,
        });
      }
    }
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

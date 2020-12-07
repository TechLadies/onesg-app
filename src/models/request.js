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

    Object.keys(fulfilmentChecklistEnum).some((i) => {
      if (
        // checks if fulfilmentType is present
        Object.keys(fulfilmentChecklistEnum[i]).includes(request.fulfilmentType)
      ) {
        // checks if all items in completedFulfilmentItems is part of fulfilmentType
        const result = requestChecklist.every((j) =>
          Object.values(fulfilmentChecklistEnum[i])[0].includes(j)
        );
        if (result === false) {
          const errorInput = [];
          // filter out inputs that are not part of the fulfilmentType
          // eslint-disable-next-line no-plusplus
          for (let x = 0; x < requestChecklist.length; x++) {
            if (
              Object.values(fulfilmentChecklistEnum[i])[0].includes(
                requestChecklist[x]
              ) === false
            ) {
              errorInput.push(requestChecklist[x]);
            }
          }
          throw new ValidationError({
            message: `${errorInput} is/are not part of ${request.fulfilmentType}`,
          });
        }
      }
      return false;
    });
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

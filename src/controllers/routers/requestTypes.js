/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { UniqueViolationError, ValidationError } = require('objection');

const { RequestType } = require('../../models');

const {
  errors: { BadRequest },
} = require('../../utils');
const { InvalidInput } = require('../../utils/errors');

/**
 * Sanitize data from client by capitalizing the first char of each word.
 * Call before an insert or an update.
 * @param {Object} json - Unsanitised request type
 * @return {Object} requestType - Sanitised request type
 */
function sanitize(json) {
  const requestType = json;
  if (json.type) {
    requestType.type = json.type
      .toString()
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ')
      .trim();
  }
  return requestType;
}

/**
 * Retrieve all request types
 * @param {Request} req - request object which contains request type
 * @param {Response} res - response object which returns all request types
 * @return {Object} results - json object of all request types
 */
const getAll = async (req, res) => {
  const results = await RequestType.query();
  return res.status(200).json({ results });
};

/**
 * Create new request type
 * @param {Request} req - request object which contains request type
 * @param {Response} res - response object which returns corresponding status code, and id and request type if it is successfully created
 * @param {Function} next - error handler functions
 * @return {Object} requestType - json object of the newly created request type

 */
const create = async (req, res, next) => {
  const newRequestType = sanitize(req.body);
  try {
    const requestType = await RequestType.query()
      .insert(newRequestType)
      .returning('*');
    return res.status(201).json({ requestType });
  } catch (err) {
    // if there are already existing request types
    if (err instanceof UniqueViolationError) {
      return next(new BadRequest(err.nativeError.detail));
    }
    // if the input type is invalid (eg null)
    if (err instanceof ValidationError) {
      return next(new InvalidInput(err.message));
    }
    // handles rest of the error
    // from objection's documentation, the structure below should hold
    // if there's need to change, do not send the whole err object as that could lead to disclosing sensitive details; also do not send err.message directly unless the error is of type ValidationError
    return next(new BadRequest(err.nativeError.detail));
  }
};

module.exports = {
  getAll,
  create,
};

/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { UniqueViolationError } = require('objection');

const { RequestType } = require('../../models');

const {
  errors: { BadRequest },
} = require('../../utils');

/**
 * Sanitize data from client. Call before an insert or an update.
 */
function sanitize(json) {
  const requestType = json;
  if (json.type) {
    requestType.type = json.type
      .toString()
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
  }
  return requestType;
}

/**
 * Retrieve all referees
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const results = await RequestType.query().select('type');
  return res.status(200).json({ results });
};

/**
 * Create new referee
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res, next) => {
  const newRequestType = sanitize(req.body);
  try {
    const requestType = await RequestType.query()
      .select()
      .insert(newRequestType)
      .returning('id');
    return res.status(201).json({ requestType });
  } catch (err) {
    if (err instanceof UniqueViolationError) {
      return next(new BadRequest(err.nativeError.detail));
    }
    // handles rest of the error
    // from objection's documentation, the structure below should hold
    // if there's need to change, do not send the whole err object as that could lead to disclosing sensitive details; also do not send err.message directly unless the error is of type ValidationError
    return next(err.message);
  }
};

module.exports = {
  getAll,
  create,
};

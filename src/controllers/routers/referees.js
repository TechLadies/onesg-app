/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { ValidationError, UniqueViolationError } = require('objection');

const { Referee } = require('../../models');

const {
  errors: { BadRequest, InvalidInput },
} = require('../../utils');

/**
 * Retrieve all references
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const referees = await Referee.query().select();
  return res.status(200).json(referees);
};

/**
 * Create new reference
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res, next) => {
  const newReferee = req.body;
  try {
    const ref = await Referee.query().insert(newReferee).returning('RefereeId');
    return res.status(201).json(ref.RefereeId);
  } catch (err) {
    // if error type is validation error
    if (err instanceof ValidationError) {
      return next(new InvalidInput(err.message));
    }
    // if error type is duplicate entry
    if (err instanceof UniqueViolationError) {
      return next(new BadRequest(err.nativeError.detail));
    }
    return next(new InvalidInput(err)); // to change to different error
  }
};

module.exports = {
  getAll,
  create,
  // validate,
};

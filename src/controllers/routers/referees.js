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
 * Retrieve all referees
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const referees = await Referee.query().select();
  return res.status(200).json(referees);
};

/**
 * Create new referee
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res, next) => {
  const newReferee = req.body;
  try {
    const ref = await Referee.query().insert(newReferee).returning('refereeId');
    return res.status(201).json(ref);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.json(new InvalidInput(err.message));
    }
    if (err instanceof UniqueViolationError) {
      return res.json(new BadRequest(err.nativeError.detail));
    }
    return next(err);
  }
};

module.exports = {
  getAll,
  create,
};

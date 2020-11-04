/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

// const { ValidationError, UniqueViolationError } = require('objection');

const { Referee } = require('../../models');

// const {
//   errors: { BadRequest, InvalidInput },
// } = require('../../utils');

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
    return next(err);
  }
};

module.exports = {
  getAll,
  create,
};

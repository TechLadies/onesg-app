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
 * Retrieve all referees
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const referees = await Referee.query().select();
  return res.status(200).json(referees);
};

/**
 * Retrieve one referee
 * @param {Request} req
 * @param {Response} res
 */
const getReferee = async (req, res, next) => {
  const refId = req.params.id;
  try {
    const referee = await Referee.query().select().where('RefereeId', refId);
    return res.status(200).json(referee);
  } catch (err) {
    return next(err);
  }
};

/**
 * Create new referee
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

/**
 * Update existing referee
 * @param {Request} req
 * @param {Response} res
 */
const update = async (req, res, next) => {
  const refId = req.params.id;
  const updateInfo = req.body;
  try {
    const ref = await Referee.query()
      .patch(updateInfo)
      .where('RefereeId', refId);
    return res
      .status(201)
      .json(
        `The following has been updated for RefereeId ${ref}: ${JSON.stringify(
          updateInfo
        )}`
      );
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAll,
  getReferee,
  create,
  update,
};

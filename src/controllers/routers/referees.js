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
 * Sanitize data from client. Call before an insert or an update.
 */
function sanitize(json) {
  const referee = json;
  if (json.name) {
    referee.name = json.name.trim();
  }
  if (json.phone) {
    referee.phone = json.phone.trim();
  }
  if (json.email) {
    referee.email = json.email.toLowerCase().trim();
  }
  if (json.organisation) {
    referee.organisation = json.organisation.trim();
  }

  return referee;
}

/**
 * Retrieve all referees
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const referees = await Referee.query().select();
  return res.status(200).json({ results: referees });
};

/**
 * Retrieve one referee
 * @param {Request} req
 * @param {Response} res
 */
const getReferee = async (req, res, next) => {
  const refId = req.params.id;
  const checkRef = await Referee.query().select('refereeId');
  if (refId in checkRef) {
    try {
      const ref = await Referee.query().select().where('refereeId', refId);
      return res.status(200).json({ referee: ref });
    } catch (err) {
      return next(err);
    }
  }
  return next(new BadRequest(`refereeId ${refId} does not exist`));
};

/**
 * Create new referee
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res, next) => {
  const newReferee = sanitize(req.body);
  try {
    const ref = await Referee.query().insert(newReferee).returning('refereeId');
    return res.status(201).json({ refereeId: ref.refereeId });
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(new InvalidInput(err.message));
    }
    if (err instanceof UniqueViolationError) {
      return next(new BadRequest(err.nativeError.detail));
    }

    // handles rest of the error
    // from objection's documentation, the structure below should hold
    // if there's need to change, do not send the whole err object as that could lead to disclosing sensitive details; also do not send err.message directly unless the error is of type ValidationError
    return next(new BadRequest(err.nativeError.detail));
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
  const checkRef = await Referee.query().select('refereeId');
  if (refId in checkRef) {
    try {
      await Referee.query().patch(updateInfo).where('refereeId', refId);
      const ref = await Referee.query().select().where('refereeId', refId);
      return res.status(200).json({ referee: ref });
    } catch (err) {
      if (err instanceof ValidationError) {
        return next(new InvalidInput(err.message));
      }
      if (err instanceof UniqueViolationError) {
        return next(new BadRequest(err.nativeError.detail));
      }
      return next(new BadRequest(err.nativeError.detail));
    }
  }
  return next(new BadRequest(`refereeId ${refId} does not exist`));
};

module.exports = {
  getAll,
  getReferee,
  create,
  update,
};

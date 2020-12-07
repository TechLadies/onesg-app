/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { ValidationError, UniqueViolationError } = require('objection');

const { Referee } = require('../../models');

const {
  errors: { BadRequest, InvalidInput, ResourceNotFound },
} = require('../../utils');

/**
 * Sanitize data from client. Call before an insert or an update.
 */
function sanitize(json) {
  const referee = json;
  if (json.name) {
    referee.name = json.name.trim();
  }
  if (json.phone && !Number.isInteger(json.phone)) {
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
  const results = await Referee.query();
  return res.status(200).json({ results });
};

/**
 * Retrieve specific referee by id
 * @param {Request} req
 * @param {Response} res
 */
const getReferee = async (req, res, next) => {
  const { id } = req.params;
  try {
    const referee = await Referee.query().findById(id);
    if (!referee) {
      return next(new ResourceNotFound(`Referee ${id} does not exist`));
    }
    return res.status(200).json({ referee });
  } catch (err) {
    return next();
  }
};

/**
 * Create new referee
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res, next) => {
  const newReferee = sanitize(req.body);
  try {
    const referee = await Referee.query().insert(newReferee).returning('id');
    return res.status(201).json({ referee });
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
    return next(new BadRequest(err.nativerError.detail));
  }
};

/**
 * Update existing referee
 * @param {Request} req
 * @param {Response} res
 */
const update = async (req, res, next) => {
  const { id } = req.params;
  const updateInfo = sanitize(req.body);
  try {
    const referee = await Referee.query()
      .select()
      .patch(updateInfo)
      .where('id', id)
      .returning(
        'name',
        'email',
        'phone',
        'organisation',
        'refereeNumber',
        'createdAt',
        'updatedAt'
      );
    if (referee.length === 0) {
      return next(new ResourceNotFound(`Referee ${id} does not exist`));
    }
    return res.status(200).json({ referee });
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(new InvalidInput(err.message));
    }
    if (err instanceof UniqueViolationError) {
      return next(new BadRequest(err.nativeError.detail));
    }
    return next();
  }
};

module.exports = {
  getAll,
  getReferee,
  create,
  update,
};

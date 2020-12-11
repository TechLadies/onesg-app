/* eslint-disable no-console */
/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const {
  NotNullViolationError,
  ValidationError,
  UniqueViolationError,
} = require('objection');

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
  if (json.createdBy) {
    referee.createdBy = parseInt(json.createdBy, 10);
  }
  if (json.updatedBy) {
    referee.updatedBy = parseInt(json.updatedBy, 10);
  }

  return referee;
}

/**
 * Check if id is an int
 */
function isValidId(id) {
  if (Number.isNaN(parseInt(id, 10))) {
    return false;
  }
  return true;
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
const getById = async (req, res, next) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return next(new ResourceNotFound(`Referee ${id} does not exist`));
  }
  try {
    const referee = await Referee.query()
      .select('name', 'email', 'phone', 'organisation')
      .where('refereeNumber', id);
    if (referee.length === 0) {
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
    // if required fields are null
    if (err instanceof NotNullViolationError) {
      return next(new InvalidInput(`${err.nativeError.column} cannot be null`));
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
  const { id } = req.params;
  if (!isValidId(id)) {
    return next(new ResourceNotFound(`Referee ${id} does not exist`));
  }
  const updateInfo = sanitize(req.body);
  try {
    const referee = await Referee.query()
      .select()
      .patch(updateInfo)
      .findById(id)
      .returning('*');
    return res.status(200).json({ referee });
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(new InvalidInput(err.message));
    }
    if (err instanceof UniqueViolationError) {
      return next(new BadRequest(err.nativeError.detail));
    }
    if (err instanceof NotNullViolationError) {
      return next(new InvalidInput(`${err.nativeError.column} cannot be null`));
    }
    return next();
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};

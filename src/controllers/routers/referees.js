/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { check, validationResult } = require('express-validator');

const { Referee } = require('../../models');

const {
  errors: { BadRequest, UnprocessableEntity },
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
  // Return if there are any validation errors
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return next(new BadRequest(validationError.errors[0].msg));
  }
  const newReferee = req.body;
  try {
    // Check if reference already exists in db, and returns RefereeId
    const ref = await Referee.query().insert(newReferee).returning('RefereeId');
    return res.status(201).json(ref.RefereeId);
  } catch (err) {
    return next(new UnprocessableEntity(err.data));
  }
};

/**
 * Validate new reference
 * @param {Request} req
 * @param {Response} res
 */
const validate = [
  check('Name')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Reference name must be alphabetic'),
  check('Email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Email format invalid')
    .normalizeEmail({ all_lowercase: true }), // sanitisation
  check('Phone').isNumeric().withMessage('Phone number must be numeric'),
  check('Organisation').optional({ checkFalsy: true }),
];

module.exports = {
  getAll,
  create,
  validate,
};

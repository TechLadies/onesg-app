/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { check, validationResult } = require('express-validator');

const {
  errors: { BadRequest, UnprocessableEntity },
} = require('../../utils');

const db = require('../../../config/db');

/**
 * Retrieve all references
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const result = await db('referees');
  res.status(200).json(result);
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
    next(new BadRequest(validationError.errors[0].msg));
  }
  const newReferee = req.body;
  try {
    // Check if reference already exists in db, and returns RefereeId
    const id = await db('referees').insert(newReferee).returning('RefereeId');
    return res.status(201).json(id);
  } catch (err) {
    return next(new UnprocessableEntity(err));
    // return res
    //   .status(new UnprocessableEntity().error.statusCode)
    //   .json(new UnprocessableEntity(err));
  }
};

/**
 * Validate new reference
 * @param {Request} req
 * @param {Response} res
 */
const validate = [
  check('Name', 'Reference name invalid')
    .exists() // makes Name field mandatory
    .isString() // checks for string format
    .withMessage('Please enter only  letters or numbers for name')
    .isLength({ min: 1, max: 255 })
    .withMessage('Please enter a name with a min length of 1 character'), // checks for length of name
  check('Email', 'Email format invalid')
    .optional({ checkFalsy: true }) // fields with falsy values (eg "", 0, false, null) will also be considered optional
    .isEmail() // checks for email format
    .isLength({ min: 1, max: 255 }),
  check('Phone', 'Phone format invalid')
    .isNumeric() // checks if string only contains numbers
    .withMessage('Please enter only numbers for phone')
    .isLength({ max: 12 }),
  check('Organisation', 'Organisation invalid')
    .optional({ checkFalsy: true })
    .isString() // checks if string only contains letters and numbers
    .isLength({ max: 255 })
    .withMessage(
      'Please enter an organisation with a max length of 255 characters'
    ),
];

module.exports = {
  getAll,
  create,
  validate,
};

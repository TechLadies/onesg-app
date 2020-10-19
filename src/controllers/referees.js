/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */
const { check, validationResult } = require('express-validator')
const {
  errors: { BadRequest, UnprocessableEntity },
} = require('../utils')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
// eslint-disable-next-line import/order
const db = require('knex')(configuration)

/**
 * Retrieve all references
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const result = await db('referees')
  res.status(200).json(result)
}

/**
 * Create new reference
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res) => {
  // Return if there are any validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(BadRequest().error.statusCode)
      .json(new BadRequest(errors))
  }
  const newReferee = req.body
  try {
    // Check if reference already exists in db
    const ref = await db('referees').insert(newReferee)
    return res
      .status(201)
      .json({ message: 'Reference successfully created', ref })
  } catch (err) {
    return res
      .status(new UnprocessableEntity().error.statusCode)
      .json(new UnprocessableEntity('Reference already exists')) // need to create an error handler for internal server error
  }
}

/**
 * Validate new reference
 * @param {Request} req
 * @param {Response} res
 */
const validate = [
  check('RefereeId', 'Reference ID invalid').isInt(), // checks for int format
  check('Name', 'Reference name invalid')
    .exists() // makes Name field mandatory
    .isString() // checks for string format
    .isLength({ min: 1, max: 255 }), // checks for length of name
  check('Email', 'Email format invalid')
    .isEmail() // checks for email format
    .isLength({ min: 1, max: 255 }),
  check('Phone', 'Phone format invalid')
    .isNumeric() // checks if string only contains numbers
    .isLength({ max: 12 }),
  check('Organisation', 'Organisation invalid')
    .isString()
    .isLength({ max: 255 }),
]

module.exports = {
  getAll,
  create,
  validate,
}

/* eslint-disable no-console */
const { check, validationResult } = require('express-validator');

const db = require('../../../config/db');

/**
 * Module dependencies.
 */
const { Beneficiary } = require('../../models');

/**
 * Retrieve all beneficiaries
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const beneficiaries = await Beneficiary.query().select();
  res.status(200).json({ beneficiaries });
};

/**
 * Create new Beneficiaries
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res) => {
  // Return if there are any validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }
  const newBeneficiary = req.body;
  console.log(newBeneficiary);

  try {
    // Check if beneficiary already exists in db
    const ben = await db('beneficiary').insert(newBeneficiary);
    return res
      .status(201)
      .json({ message: 'Beneficiary successfully created', ben });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Beneficiary already exists', error: err });
  }
};

/**
 * Validate new Beneficiaries
 * @param {Request} req
 * @param {Response} res
 */
const validate = [
  check('Name', 'Beneficiary name invalid')
    .exists() // makes Name field mandatory
    .isString() // checks for string format
    .isLength({ min: 1, max: 255 }), // checks for length of name
  check('Email', 'Email format invalid')
    .optional({ checkFalsy: true })
    .isEmail() // checks for email format
    .isLength({ min: 1, max: 255 }),
  check('Phone', 'Phone format invalid')
    .optional({ checkFalsy: true })
    .isNumeric() // checks if string only contains numbers
    .isLength({ max: 12 }),
  check('Occupation')
    .optional({ checkFalsy: true })
    .isString() // checks if string only contains letters and numbers
    .isLength({ max: 255 }),
  check('HouseholdIncome', 'Please insert a number')
    .optional({ checkFalsy: true })
    .isCurrency() // checks if string is currency
    .isLength({ max: 12 }),
  check('HouseholdSize', 'Please insert a number')
    .optional({ checkFalsy: true })
    .isInt() // checks if string only contains numbers
    .isLength({ max: 12 }),
  check('PaymentType').isIn(['payNow', 'bankTransfer']),
];

module.exports = {
  getAll,
  create,
  validate,
};

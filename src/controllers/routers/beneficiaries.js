/* eslint-disable no-console */
const { check, validationResult } = require('express-validator');
const {
  errors: { BadRequest, UnprocessableEntity },
} = require('../../utils');
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
const create = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return next(new BadRequest(validationError.errors[0].msg));
  }
  const ben = req.body;
  try {
    await Beneficiary.query().insert(ben).returning('BenId');
    return res
      .status(201)
      .json({ message: `${req.body.Name} successfully added` });
  } catch (err) {
    console.log(err);
    return next(new UnprocessableEntity(err.data));
  }
};

/**
 * Update Beneficiaries
 * @param {Request} req
 * @param {Response} res
 */
const update = async (req, res, next) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return next(new BadRequest(validationError.errors[0].msg));
  }
  const ben = req.body;
  try {
    await Beneficiary.query()
      .update(ben)
      .where('BeneficiaryId', req.body.BeneficiaryId);
    return res
      .status(201)
      .json({ message: `${req.body.Name} successfully updated` });
  } catch (err) {
    console.log(err);
    return next(new UnprocessableEntity(err.data));
  }
};

/**
 * Delete Beneficiaries
 * @param {Request} req
 * @param {Response} res
 */

const del = async (req, res) => {
  try {
    await Beneficiary.query()
      .delete()
      .where({ BeneficiaryId: req.body.BeneficiaryId });
    return res
      .status(201)
      .json({ message: `${req.body.Name} successfully deleted` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Beneficiary cannot be deleted', error: err });
  }
};

/**
 * Validate Beneficiaries
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
  update,
  del,
  validate,
};

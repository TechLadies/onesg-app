/* eslint-disable no-console */
<<<<<<< HEAD

const { ValidationError, UniqueViolationError } = require('objection');
const {
  errors: { BadRequest, InvalidInput, ResourceNotFound },
} = require('../../utils');
const { Beneficiary } = require('../../models');

=======
const { check, validationResult } = require('express-validator');
const {
  errors: { BadRequest, UnprocessableEntity },
} = require('../../utils');
const { Beneficiary } = require('../../models');
>>>>>>> objection query

/**
 * Sanitize data from client. Call before an insert or an update.
 */
function sanitize(json) {
  const beneficiary = json;
  if (json.name) {
    beneficiary.name = json.name.trim();
  }
  if (json.phone && !Number.isInteger(json.phone)) {
    beneficiary.phone = json.phone.trim();
  }
  if (json.email) {
    beneficiary.email = json.email.toLowerCase().trim();
  }
  if (json.organisation) {
    beneficiary.organisation = json.organisation.trim();
  }

  return beneficiary;
}

/**
 * Retrieve all beneficiaries
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const beneficiaries = await Beneficiary.query().select(
    'name',
    'email',
    'phone',
    'occupation',
    'notes',
    'householdIncome',
    'householdSize',
    'paymentType',
    'created_at',
    'updated_at'
  );
  res.status(200).json({ beneficiaries });
};

/**
<<<<<<< HEAD
 * Retrieve specific beneficiary with cases
 * @param {Request} req
 * @param {Response} res
 */
const getBeneficiarybyCase = async (req, res) => {
  const byCase = await Beneficiary.query().withGraphFetched(
    '[cases, referees]'
  );
  res.status(200).json({ byCase });
};

/**
 * Retrieve specific referee by id
 * @param {Request} req
 * @param {Response} res
 */

const getBeneficiary = async (req, res, next) => {
  const { id } = req.params;
  try {
    const beneficiary = await Beneficiary.query()
      .select(
        'name',
        'email',
        'phone',
        'occupation',
        'notes',
        'householdIncome',
        'householdSize',
        'paymentType',
        'created_at',
        'updated_at'
      )
      .where('beneficiaryId', id);
    if (beneficiary.length === 0) {
      return next(new ResourceNotFound(`Beneficiary ${id} does not exist`));
    }
    return res.status(200).json({ beneficiary });
  } catch (err) {
    return next();
=======
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
    await Beneficiary.query().insert(ben).returning('BeneficiaryId');
    return res
      .status(201)
      .json({ message: `${req.body.Name} successfully added` });
  } catch (err) {
    return next(new UnprocessableEntity(err.data));
>>>>>>> objection query
  }
};

/**
 * Update Beneficiaries
 * @param {Request} req
 * @param {Response} res
 */
<<<<<<< HEAD
const create = async (req, res, next) => {
  const newBeneficiary = sanitize(req.body);
  try {
<<<<<<< HEAD
    const ben = await Beneficiary.query()
      .select()
      .insert(newBeneficiary)
      .returning('beneficiaryId');

    return res.status(201).json({ ben });
=======
    // Check if beneficiary already exists in db
    await db('beneficiary').insert(Beneficiary).returning('BeneficiaryId');
    return res.status(201);
>>>>>>> revise env
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
=======
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
>>>>>>> objection query
  }
};

/**
 * Delete Beneficiaries
 * @param {Request} req
 * @param {Response} res
 */

<<<<<<< HEAD
const update = async (req, res) => {
  // Return if there are any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const updateBeneficiary = req.body;
  // const benID = req.body.BeneficiaryId;
  console.log(req.params.BeneficiaryId);

  try {
    // Check if beneficiary already exists in db
    const updateben = await db('beneficiary')
      .where({ BeneficiaryId: req.params.BeneficiaryId })
      .update(updateBeneficiary);
=======
const del = async (req, res) => {
  try {
    await Beneficiary.query()
      .delete()
      .where({ BeneficiaryId: req.body.BeneficiaryId });
>>>>>>> objection query
    return res
      .status(201)
      .json({ message: `${req.body.Name} successfully deleted` });
  } catch (err) {
<<<<<<< HEAD
    console.log(err);
    return res.status(500).json({ message: 'Update Fail', error: err });
=======
    return res
      .status(500)
      .json({ message: 'Beneficiary cannot be deleted', error: err });
>>>>>>> objection query
  }
};

/**
<<<<<<< HEAD
 * Update existing beneficiary
 * @param {Request} req
 * @param {Response} res
 */
const update = async (req, res, next) => {
  const { id } = req.params;
  const updateInfo = sanitize(req.body);
  try {
    const beneficiary = await Beneficiary.query()
      .select()
      .patch(updateInfo)
      .where('beneficiaryId', id)
      .returning(
        'beneficiaryId',
        'name',
        'email',
        'phone',
        'occupation',
        'notes',
        'householdIncome',
        'householdSize',
        'paymentType',
        'created_at',
        'updated_at'
      );
    if (beneficiary.length === 0) {
      return next(new ResourceNotFound(`Beneficiary ${id} does not exist`));
    }
    return res.status(200).json({ beneficiary });
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
/**
 * Delete Beneficiaries
 * @param {Request} req
 * @param {Response} res
 */

const del = async (req, res) => {
  try {
    await Beneficiary.query()
      .delete()
      .where({ BeneficiaryId: req.body.beneficiaryId });
    return res
      .status(201)
      .json({ message: `${req.body.Name} successfully deleted` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Beneficiary cannot be deleted', error: err });
  }
};
=======
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
>>>>>>> objection query

module.exports = {
  getAll,
  getBeneficiary,
  create,
  update,
  del,
<<<<<<< HEAD
  getBeneficiarybyCase,
=======
  validate,
>>>>>>> objection query
};

/* eslint-disable no-console */
const {
  DataError,
  ValidationError,
  UniqueViolationError,
} = require('objection');
const {
  errors: { BadRequest, InvalidInput, ResourceNotFound },
} = require('../../utils');
const { Beneficiary } = require('../../models');

/**
 * Sanitize data from client. Call before an insert or an update.
 */
function sanitize(json) {
  const beneficiary = json;
  if (json.name) {
    beneficiary.name = json.name.trim();
  }
  if (json.phone) {
    if (Number.isInteger(json.phone) === true) {
      beneficiary.phone = String(json.phone);
    } else {
      beneficiary.phone = json.phone.trim();
    }
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
    'beneficiaryId',
    'name',
    'email',
    'phone',
    'occupation',
    'householdIncome',
    'householdSize',
    'paymentType'
  );
  res.status(200).json({ beneficiaries });
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
        'beneficiaryId',
        'name',
        'email',
        'phone',
        'occupation',
        'householdIncome',
        'householdSize',
        'paymentType'
      )
      .where('beneficiaryId', id);
    if (beneficiary.length === 0) {
      return next(new ResourceNotFound(`Beneficiary ${id} does not exist`));
    }
    return res.status(200).json({ beneficiary });
  } catch (err) {
    if (err instanceof DataError) {
      return next(new BadRequest('Beneficiary Id format is invalid'));
    }
    return next();
  }
};

/**
 * Create new Beneficiaries
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res, next) => {
  try {
    const newBen = req.body;
    const ben = await Beneficiary.query()
      .insert(newBen)
      .returning('beneficiaryId');

    return res.status(201).json(ben);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.json(new InvalidInput(err.message));
    }
    if (err instanceof UniqueViolationError) {
      return res.json(new BadRequest(err.nativeError.detail));
    }
    return next(err);
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
    const beneficiary = await Beneficiary.query()
      .select(
        'beneficiaryId',
        'name',
        'email',
        'phone',
        'occupation',
        'householdIncome',
        'householdSize',
        'paymentType'
      )
      .patch(updateInfo)
      .where('beneficiaryId', id)
      .returning(
        'beneficiaryId',
        'name',
        'email',
        'phone',
        'occupation',
        'householdIncome',
        'householdSize',
        'paymentType'
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
    if (err instanceof DataError) {
      return next(new BadRequest('Beneficiary Id format is invalid'));
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

module.exports = {
  getAll,
  getBeneficiary,
  create,
  update,
  del,
};

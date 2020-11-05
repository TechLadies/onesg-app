/* eslint-disable no-console */
const { ValidationError, UniqueViolationError } = require('objection');
const {
  errors: { BadRequest, InvalidInput },
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
 * Update Beneficiaries
 * @param {Request} req
 * @param {Response} res
 */

const update = async (req, res, next) => {
  const updateBen = req.body;
  console.log(req.body.email);
  try {
    await Beneficiary.query()
      .update(updateBen)
      .where('beneficiaryId', req.params.beneficiaryId);
    return res.status(201).json(`${req.params.beneficiaryId} has been updated`);
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
  create,
  update,
  del,
};

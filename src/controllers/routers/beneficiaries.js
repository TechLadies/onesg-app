const {
  ValidationError,
  UniqueViolationError,
  NotNullViolationError,
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
  if (json.phone && !Number.isInteger(json.phone)) {
    beneficiary.phone = json.phone.trim();
  }
  if (json.email) {
    beneficiary.email = json.email.toLowerCase().trim();
  }
  if (json.occupation) {
    beneficiary.occupation = json.occupation.trim();
  }
  if (json.householdIncome) {
    beneficiary.householdIncome = parseFloat(json.householdIncome, 10);
  }
  if (json.householdSize) {
    beneficiary.householdSize = parseInt(json.householdSize, 2);
  }
  if (json.notes) {
    beneficiary.notes = json.notes.trim();
  }
  if (json.createdBy) {
    beneficiary.createdBy = parseInt(json.createdBy, 10);
  }
  if (json.updatedBy) {
    beneficiary.updatedBy = parseInt(json.updatedBy, 10);
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
    'beneficiaryNumber',
    'name',
    'email',
    'phone',
    'occupation',
    'notes',
    'householdIncome',
    'householdSize',
    'paymentType',
    'createdBy',
    'updatedBy'
  );
  res.status(200).json({ beneficiaries });
};

/**
 * Retrieve specific referee by id
 * @param {Request} req
 * @param {Response} res
 */

const getBeneficiarybyId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const beneficiary = await Beneficiary.query()
      .select(
        'beneficiaryNumber',
        'name',
        'email',
        'phone',
        'occupation',
        'notes',
        'householdIncome',
        'householdSize',
        'paymentType',
        'createdBy',
        'updatedBy'
      )
      .where('beneficiaryNumber', id)
      .withGraphFetched('[cases, referees]');

    if (beneficiary.length === 0) {
      return next(new ResourceNotFound(`Beneficiary ${id} does not exist`));
    }
    return res.status(200).json({ beneficiary });
  } catch (err) {
    return next();
  }
};

/**
 * Create new Beneficiaries
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res, next) => {
  const newBeneficiary = sanitize(req.body);

  try {
    const ben = await Beneficiary.query()
      .select()
      .insert(newBeneficiary)
      .returning('beneficiaryNumber');

    return res.status(201).json({ ben });
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
      .where('beneficiaryNumber', id)
      .returning(
        'beneficiaryNumber',
        'name',
        'email',
        'phone',
        'occupation',
        'notes',
        'householdIncome',
        'householdSize',
        'paymentType',
        'updatedBy'
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
      .where({ beneficiaryNumber: req.body.beneficiaryNumber });
    return res
      .status(201)
      .json({ message: `${req.body.name} successfully deleted` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Beneficiary cannot be deleted', error: err });
  }
};

module.exports = {
  getAll,
  getBeneficiarybyId,
  create,
  update,
  del,
};

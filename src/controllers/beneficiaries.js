/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Retrieve all beneficiaries
 * @param {Request} req
 * @param {Response} res
 */
const getAll = (req, res) => {
  res.status(200).json({ data: 'sample GET /v1/beneficiaries data :p' });
};

module.exports = {
  getAll,
};

/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Handlers for beneficiaries endpoints (/v1/beneficiaries)
 */

const getAll = (req, res) => {
  res.status(200).json({ data: 'sample GET /v1/beneficiaries data :p' });
};

module.exports = {
  getAll: getAll,
};

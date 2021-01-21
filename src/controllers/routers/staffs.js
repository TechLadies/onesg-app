/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { Staff } = require('../../models');

const {
  errors: { InvalidInput },
} = require('../../utils');

/**
 * Retrieve all referees
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res, next) => {
  const parsedQueries = req.query;
  try {
    if (
      parsedQueries.status !== 'active' &&
      parsedQueries.status !== 'disabled'
    ) {
      return next(
        new InvalidInput(
          `Status can only be 'active' or 'disabled', ${parsedQueries.status} is invalid, `
        )
      );
    }
    if (parsedQueries.status === 'active') {
      const results = await Staff.query().where('status', 'ACTIVE');
      return res.status(200).json({ results });
    }
    if (parsedQueries.status === 'disabled') {
      const results = await Staff.query().where('status', 'DISABLED');
      return res.status(200).json({ results });
    }
    const results = await Staff.query();
    return res.status(200).json({ results });
  } catch (err) {
    return next();
  }
};

module.exports = {
  getAll,
};

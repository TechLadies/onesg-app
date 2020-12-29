/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const url = require('url');
const querystring = require('querystring');

const { Staff } = require('../../models');

/**
 * Retrieve all referees
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  // to obtain the full url
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  // to parse the full url to retrieve all query params
  const parsedUrl = url.parse(fullUrl);
  // to break down into individual query params
  const parsedQueries = querystring.parse(parsedUrl.query);
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
};

module.exports = {
  getAll,
};

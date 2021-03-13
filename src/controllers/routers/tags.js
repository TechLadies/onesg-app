/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { UniqueViolationError, ValidationError } = require('objection');

const { Tag } = require('../../models');

const {
  errors: { BadRequest },
} = require('../../utils');
const { InvalidInput } = require('../../utils/errors');

/**
 * Sanitize data from client by capitalizing the first char of each word.
 * Call before an insert or an update.
 * @param {Object} json - Unsanitised request type
 * @return {Object} requestType - Sanitised request type
 */
function sanitize(json) {
  const tag = json;
  if (json.name) {
    tag.name = json.name
      .toString()
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ')
      .trim();
  }
  return tag;
}

/**
 * Retrieve all tags
 * @param {Request} req - request object which contains tag
 * @param {Response} res - response object which returns all tags
 * @return {Object} results - json object of all tags
 */
const getAll = async (req, res) => {
  const results = await Tag.query();
  return res.status(200).json({ results });
};

/**
 * Create new tag
 * @param {Request} req - request object which contains tag
 * @param {Response} res - response object which returns corresponding status code, and id and tag if it is successfully created
 * @param {Function} next - error handler functions
 * @return {Object} tag - json object of the newly created tag

 */
const create = async (req, res, next) => {
  const newTag = sanitize(req.body);
  try {
    const tag = await Tag.query().insert(newTag).returning('*');
    return res.status(201).json({ tag });
  } catch (err) {
    // if there are already existing tags
    if (err instanceof UniqueViolationError) {
      return next(new BadRequest(err.nativeError.detail));
    }
    // if the input type is invalid (eg null)
    if (err instanceof ValidationError) {
      return next(new InvalidInput(err.message));
    }
    // handles rest of the error
    // from objection's documentation, the structure below should hold
    // if there's need to change, do not send the whole err object as that could lead to disclosing sensitive details; also do not send err.message directly unless the error is of type ValidationError
    return next(new BadRequest(err.nativeError.detail));
  }
};

module.exports = {
  getAll,
  create,
};

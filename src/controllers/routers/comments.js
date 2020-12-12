/* eslint-disable object-shorthand */
/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { ForeignKeyViolationError } = require('objection');
const { Comment, Case } = require('../../models');

const {
  errors: { BadRequest, ResourceNotFound },
} = require('../../utils');

/**
 * Retrieve specific case by id
 * @param {Request} req
 * @param {Response} res
 */
const getCommentsbyCaseNumber = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cases = await Case.query().where('caseNumber', id);
    if (cases.length === 0) {
      return next(new ResourceNotFound(`Case ${id} does not exist`));
    }
    const commentByCaseNumber = await Comment.query()
      .select('message', 'author')
      .where('caseNumber', id);
    return res.status(200).json({ comments: commentByCaseNumber });
  } catch (err) {
    //
    return next();
  }
};

/**
 * Create new comment
 * @param {Request} req
 * @param {Response} res
 */

const create = async (req, res, next) => {
  const { id } = req.params;
  const author = Case.query().select('pointOfContact').where('caseNumber', id);
  const newComments = {
    message: req.body.message,
    caseNumber: req.params.id,
    author: author,
  };
  try {
    const comments = await Comment.query()
      .insertGraphAndFetch(newComments)
      .where('caseNumber', id);
    return res.status(201).json({ comments });
  } catch (err) {
    // ForeignKeyViolationError for caseNumber that is not present
    if (err instanceof ForeignKeyViolationError) {
      if (err.constraint === 'comment_casenumber_foreign') {
        return next(
          new BadRequest(`Case ${newComments.caseNumber} is not present`)
        );
      }
    }
    return next(err);
  }
};

module.exports = {
  getCommentsbyCaseNumber,
  create,
};

/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const xss = require('xss');

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
const getCommentsbyCaseId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cases = await Case.query().where('id', id);
    if (cases.length === 0) {
      return next(new ResourceNotFound(`Case ${id} does not exist`));
    }
    const commentById = await Comment.query()
      .select('id', 'caseId', 'message', 'staffId', 'createdAt')
      .withGraphFetched('staffs(name)')
      .modifiers({
        name(builder) {
          builder.select('username');
        },
      })
      .where('caseId', id);
    return res.status(200).json({ comments: commentById });
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
  const staffId = req.user.id;
  // console.log(staffId);
  const caseId = parseInt(req.params.id, 10);
  const newComments = {
    message: xss(req.body.message),
    caseId,
    staffId,
  };
  try {
    const comments = await Comment.query()
      .insertGraph(newComments)
      .where('caseId', id);
    return res.status(201).json({ comments });
  } catch (err) {
    // ForeignKeyViolationError for caseNumber that is not present
    if (err instanceof ForeignKeyViolationError) {
      if (err.constraint === 'comment_caseId_foreign') {
        return next(
          new BadRequest(`Case ${newComments.caseId} is not present`)
        );
      }
    }
    return next(err);
  }
};

module.exports = {
  getCommentsbyCaseId,
  create,
};

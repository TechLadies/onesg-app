/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { Comment, Case } = require('../../models');

const {
  errors: { ResourceNotFound },
} = require('../../utils');
// const { InvalidInput } = require('../../utils/errors');

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

module.exports = {
  getCommentsbyCaseNumber,
};

/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

const knex = require('knex')
// isn't this and bottom already in models > index and exported as db? idk why I can't access it
const config = require('../../knexfile').development

const db = knex(config)

/**
 * Retrieve all reference
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const result = await db('referees')
  res.status(200).json(result)
}

/**
 * Create new reference
 * @param {Request} req
 * @param {Response} res
 */
const create = (req, res) => {
  // const newReference = req.body
  res.status(200).json({ data: 'sample POST /v1/reference data' })
}

module.exports = {
  getAll,
  create,
}

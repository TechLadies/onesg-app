/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
// eslint-disable-next-line import/order
const db = require('knex')(configuration)

/**
 * Retrieve all references
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
const create = async (req, res) => {
  const newReference = req.body
  try {
    const id = await db('referees').insert(newReference)
    res.status(201).json(id)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error creating new reference', error: err })
  }
}

module.exports = {
  getAll,
  create,
}

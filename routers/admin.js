const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

// GET /v1/admin
router.get('/', adminController.getAll)
router.post('/', adminController.login)

// POST /v1/admin
// router.post('/', adminController.create);

module.exports = router

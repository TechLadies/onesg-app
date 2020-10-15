const express = require('express')

const authController = require('../controllers/auth')

const router = express.Router()

// GET /v1/admin
router.get('/', authController.getAll)
router.post('/', authController.login)

// POST /v1/admin
// router.post('/', adminController.create);

module.exports = router

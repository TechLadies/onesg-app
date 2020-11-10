const express = require('express');
const authController = require('../../controllers/routers/auth');

const router = express.Router();

// POST /v1/login
router.post('/', authController.login);

module.exports = router;

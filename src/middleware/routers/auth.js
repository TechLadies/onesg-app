const express = require('express');

const authController = require('../../controllers/routers/auth');

const router = express.Router();

// TODO
// POST /v1/admin
// router.post('/', adminController.create);

router.post('/', authController.login);
module.exports = router;

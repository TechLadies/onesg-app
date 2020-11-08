'use strict';

const express = require('express');

const router = express.Router();
const {
  router: { search },
} = require('../../controllers');

// router.post('/', search.postSearch);

router.get('/', search.search);

module.exports = router;

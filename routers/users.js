const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  res.status(200).json({
    message: 'Handling GET requests to /products',
  });
});

router.post('/', function (req, res) {
  const user = {
    username: req.body.username,
    userid: req.body.userid,
  };
  res.status(201).json({
    message: 'Handling POST requests to /products',
    createdUser: user,
  });
});

module.exports = router;

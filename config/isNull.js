/* eslint-disable no-console */
const isNull = (req, res, next) => {
  if (req.body.Email === '') {
    req.body.Email = null;
  }
  if (req.body.Phone === '') {
    req.body.Phone = null;
  }
  next();
};

module.exports = {
  isNull,
};

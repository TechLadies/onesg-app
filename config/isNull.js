/* eslint-disable no-console */
const isNull = (req, res, next) => {
  if (req.body.Email === '') {
    req.body.Email = null;
    console.log(typeof req.body.Email);
  }
  if (req.body.Phone === '') {
    req.body.Phone = null;
  }
  next();
};

module.exports = {
  isNull,
};

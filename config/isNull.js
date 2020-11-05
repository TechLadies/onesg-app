const isNull = (req, res, next) => {
  if (req.body.email === '') {
    req.body.email = null;
  }
  if (req.body.phone === '') {
    req.body.phone = null;
  }
  next();
};

module.exports = {
  isNull,
};

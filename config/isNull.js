const isNull = (req, res, next) => {
<<<<<<< HEAD
  if (req.body.email === '') {
    req.body.email = null;
=======
  if (req.body.Email === '') {
    req.body.Email = null;
>>>>>>> add format for ben id
  }
  if (req.body.phone === '') {
    req.body.phone = null;
  }
  next();
};

module.exports = {
  isNull,
};

const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array() });
};

const loginValidator = ['잘 되네~'];
const signupValidator = ['얘도 잘 되네~'];

module.exports = { loginValidator, signupValidator };

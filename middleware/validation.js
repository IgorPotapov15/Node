const { check, validationResult } = require('express-validator')

const validation = [
  check('email')
    .optional()
    .isEmail(),
  check('password')
    .optional()
    .isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorsObj = errors.array()
      let newMsg
      if (errorsObj[0].param === 'email') {
        newMsg = 'Invalid email address'
      }
      if (errorsObj[0].param === 'password') {
        newMsg = 'Password should be longer than 5 symbols'
      }
      return res.status(400).json({ newMsg })
    }
    next();
  },
];

module.exports = validation;
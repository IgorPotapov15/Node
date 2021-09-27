const db = require('../models')
const User = db.User

checkEmail = (req, res, next) => {
  let { email } = req.body
    // Email
    User.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (user) {
        return res.status(400).send({
          message: 'Email is already in use'
        })
      }
      return next();
    })
}

const validateEmail = {
  checkEmail: checkEmail,
}

module.exports = validateEmail;
const db = require('../models')
const User = db.User

checkAbilityToPatch = (req, res, next) => {
  let { username, email } = req.body
  if (username) {
    // Username
    User.findOne({
      where: {
        username: username
      }
    }).then(user => {
      if (user) {
        return res.status(400).send({
          message: 'Username is already in use'
        })
      }
      return next();
    })
  }
  if (email) {
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
}

const verifyPatch = {
  checkAbilityToPatch: checkAbilityToPatch,
}

module.exports = verifyPatch;
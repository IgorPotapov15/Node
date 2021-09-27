const db = require('../models')
const User = db.User

checkUsername = (req, res, next) => {
  let { username } = req.body

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

const validateUsername = {
  checkUsername: checkUsername,
}

module.exports = validateUsername;
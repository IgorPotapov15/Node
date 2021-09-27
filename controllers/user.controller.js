const db = require('../models')
const User = db.user
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const { validationResult } = require('express-validator')
let cryptoJS = require("crypto-js")

exports.getPersonal = (req, res) => {
  let token = req.headers['x-access-token']
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized'
      })
    }
    userId = decoded.id
    User.findByPk(userId).then(user => {
      return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email
      })
    })
  })
}

exports.updatePersonal = (req, res) => {
  const errors = validationResult(req)
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
  let token = req.headers['x-access-token']
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized'
      })
    }
    userId = decoded.id
    let { username, email, password } = req.body
    User.findByPk(userId).then(user => {
      if (username) {
        user.username = username
      }
      if (email) {
        user.email = email
      }
      if (password) {
        user.password = cryptoJS.AES.encrypt(password, config.secret).toString()
      }
      user.save()
      res.status(200).send(user)
    })
  })
}

exports.deletePersonal = (req, res) => {
  let token = req.headers['x-access-token']
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized'
      })
    }
    userId = decoded.id
    User.findByPk(userId).then(user => {
      user.destroy();
      res.status(204).send({
        message: 'User has been deleted'
      })
    })
  })
}


// exports.userBoard = (req, res) => {
//   res.status(200).send('User content')
// }

// exports.adminBoard = (req, res) => {
//   res.status(200).send('Admin content')
// }

// exports.moderatoeBoard = (req, res) => {
//   res.status(200).send('Moderator content')
// }
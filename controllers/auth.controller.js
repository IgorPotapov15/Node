const db = require('../models')
const config = require('../config/auth.config')
const User = db.user

let jwt = require('jsonwebtoken')
let cryptoJS = require("crypto-js");

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: cryptoJS.AES.encrypt(req.body.password, config.secret).toString(),
    dob: req.body.dob
  })
  .then(() => {
    res.send({ message: 'User war registered successfully' })
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ message: err.message })
  })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    let decrPass = (cryptoJS.AES.decrypt(user.password, config.secret)).toString(cryptoJS.enc.Utf8)
    let passIsValid = req.body.password === decrPass;

    if (!passIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid password'
      })
    }

    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400
    })

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ message: err.message })
  })
}
const { authJwt } = require('../middleware')
const controller = require('../controllers/user.controller')

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get(
    '/api/personal/', 
    authJwt.verifyToken,
    controller.getPersonal
  )

  app.patch(
    '/api/personal/',
    authJwt.verifyToken,
    controller.updatePersonal
  )

  app.delete(
    '/api/personal/',
    authJwt.verifyToken,
    controller.deletePersonal
  )

  // app.get(
  //   '/api/test/user',
  //   authJwt.verifyToken,
  //   controller.userBoard
  // )

  // app.get(
  //   '/api/test/mod',
  //   authJwt.verifyToken,
  //   controller.moderatoeBoard
  // )

  // app.get(
  //   '/api/test/admin',
  //   [authJwt.verifyToken],
  //   controller.adminBoard
  // )
}
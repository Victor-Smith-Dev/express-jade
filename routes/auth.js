var express = require('express')
var router = express.Router()
var User = require('../models/user')
var auth_controller = require('../controllers/auth_controller')

router.route('/login')
  .get( auth_controller.login )
  .post( auth_controller.login )

router.route('/signup')
  .get( auth_controller.signup )
  .post( auth_controller.signup )

module.exports = router

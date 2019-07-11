var express = require('express')
var router = express.Router()
var Image = require('../models/image')
var image_middleware = require('../middlewares/image')
var image_controller = require('../controllers/imagen_controller')

router.get('/', image_controller.image_home);

router.get('/images', image_controller.image_list)

router.route('/images/new')
	.get( image_controller.image_create )
	.post( image_controller.validate('create'), image_controller.image_create )

router.all('/images/:id*', image_middleware)

router.route('/images/:id')
	.get( image_controller.image_edit )
	.put( image_controller.image_edit )
	.delete( image_controller.image_delete )

module.exports = router

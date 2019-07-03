var Image =  require('../models/image')
const { body } = require('express-validator/check')
var fs = require("fs");
var main_contoller = require('./main_controller');
var redis = require('redis')
var client = redis.createClient()
/**
*
*/
module.exports.image_home = ( req, res ) => {
	Image.find({ owner: res.locals.user._id })
	.populate("owner")
	.exec( ( err, doc_images) => {
		if ( err ) {
			res.send(err)
		} else {
			
			var vars = {
				images : doc_images
			}

			res.render("app/home", vars)
		}
	})
}
/**
*
*/
module.exports.image_list = ( req, res ) => {
	Image.find({ owner: res.locals.user._id }, ( err, all_img ) => {

		if ( err ) {
			res.redirect("/app");
			return;
		} 
		
		var vars = {
				imagenes : all_img
		}

		res.render("app/imagenes/list", vars)
	})
}
/**
*
*/
module.exports.image_create = ( req, res, next) => {

	if ( req.method == 'GET' ) {
		res.render("app/imagenes/new")
	} else {
		req.getValidationResult().then( main_contoller.validationHandler() ).then( () => {
			var extension = req.files.image.name.split(".").pop();

			var image_data = {
				title : req.body.title,
				owner : res.locals.user._id,
				extension : extension
			}

			var image = new Image( image_data );

			image.save().then( ( img ) => {

				var img_json = {
					'id' : img._id,
					'title' : img.title,
					'extension' : img.extension
				}

				client.publish('images', JSON.stringify(img_json))
				fs.rename( req.files.image.path, "public/img/" + img._id + "." + extension, ( err ) => {
					if ( err) {
							res.send( "ERROR:" + err )
					} 
				});
				res.redirect("/app/imagenes/" + img._id)
			}, ( err ) => {
				res.send( err )
			})
		} ).catch( next )
	}	
}
/**
*
*/
module.exports.image_edit = ( req, res ) => {
	if ( req.method == 'GET' ) {
		res.render("app/imagenes/edit")
	} else {
		res.locals.image.title = req.body.title;
		res.locals.image.save( ( err ) => {
			if ( !err ) {
				res.render("app/imagenes/show")
			} else {
				res.render("app/imagenes/" + rq.params.id + "/edit", vars)					
			}
		})
	}
}
/**
*
*/
module.exports.image_delete = ( req, res ) => {
	Image.findOneAndDelete({_id : req.params.id }, ( err) => {
		if ( !err ) {
			res.redirect("/app/imagenes/");
		} else {
			res.redirect("/app/imagenes/" + req.params.id);
		}
	});
}
/**
*
*/
exports.validate = ( method ) => {
  switch ( method ) {
    case 'create': {
     return [ 
  		body('title').not().isEmpty().isLength({min: 5}).withMessage('Name must have more than 5 characters')
       ]   
    }
  }
}


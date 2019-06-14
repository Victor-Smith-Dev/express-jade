var express = require("express");
var router = express.Router();
var Image = require("./models/image");
var image_middleware = require("./middlewares/image");
var fs = require("fs");

router.get("/", ( request, response ) => {
	Image.find({ owner: response.locals.user._id })
		.populate("owner")
		.exec( ( err, doc_images) => {
			if ( err ) {
				console.log();
			} else {
				
				var vars = {
					images : doc_images
				};

				response.render("app/home", vars);
			}
		});

});

router.get("/imagenes/new", ( request, response ) => {
	response.render("app/imagenes/new");
});

// se protegen las rutas de imagenes con un middleware
router.all("/imagenes/:id*", image_middleware);

router.get("/imagenes/:id/edit", ( request, response ) => {
	response.render("app/imagenes/edit");
});

router.route("/imagenes/:id")
	.get( ( request, response ) => {
		response.render("app/imagenes/show");
	})
	.put( ( request, response ) => {
		response.locals.image.title = request.body.title;
		response.locals.image.save( ( err ) => {
			if ( !err ) {
				response.render("app/imagenes/show");
			} else {
				response.render("app/imagenes/" + request.params.id + "/edit", vars);					
			}
		});
	})
	.delete( ( request, response ) => {
		Image.findOneAndDelete({_id : request.params.id }, ( err) => {
			if ( !err ) {
				response.redirect("/app/imagenes/");
			} else {
				console.log(err);
				response.redirect("/app/imagenes/" + request.params.id);
			}
		});
	});

router.route("/imagenes")
	.get( ( request, response ) => {
		Image.find({ owner: response.locals.user._id }, ( err, all_img ) => {

			if ( err ) {
				response.redirect("/app");
				return;
			} 
			
			var vars = {
					imagenes : all_img
			};

			response.render("app/imagenes/list", vars);
		});
	})
	.post( ( request, response ) => {

		var extension = request.files.image.name.split(".").pop();

		var image_data = {
			title : request.body.title,
			owner : response.locals.user._id,
			extension : extension
		};

		var image = new Image( image_data );
		image.save().then( 
			( img ) => {
				//se guarda la imagen
				fs.rename( request.files.image.path, "public/img/" + img._id + "." + extension, ( err ) => {
					if ( err) {
 						console.log( "ERROR:" + err );
					} else {
						console.log("imagen guardada");
					}
				});
				response.redirect("/app/imagenes/" + img._id);
			},
			( err ) => {
				response.render( err );
			});
	});


module.exports = router;

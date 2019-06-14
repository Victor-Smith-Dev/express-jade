var Image = require("../models/image");
var owner_verify = require("./image_permission");

module.exports = ( request, response, next ) => {
	Image.findById( request.params.id )
		 .populate("owner")
		 .exec(	( err, img_doc) => {
				if ( img_doc != null && owner_verify( img_doc, request, response ) ) {
					response.locals = { image : img_doc };
					next();
				} else {
					response.redirect("/app");
				}
			}
		)
}
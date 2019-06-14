var User = require("../models/user").User; // se importa el modelo de usuario

module.exports = ( request, response, next) => {
	if ( !request.session.user_id ) {
		response.redirect("/login");
	} else {
		User.findById( request.session.user_id, ( err, user_doc ) => {
			if ( err ) {
				response.redirect("/login");
			} else {
				response.locals = { user: user_doc }
				next();
			}
		})
	}
} 
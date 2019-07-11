var User = require("../models/user")

module.exports = ( request, response, next) => {
	if ( !request.session.user_id ) {
		response.redirect("/auth/login")
	} else {
		User.findById( request.session.user_id, ( err, user_doc ) => {
			if ( err ) {
				response.redirect("/auth/login")
			} else {
				response.locals = { user: user_doc }
				next()
			}
		})
	}
} 
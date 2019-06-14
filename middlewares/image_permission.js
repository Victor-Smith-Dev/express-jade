var Image = require("../models/image");

module.exports = ( img, request, response ) => {

	if ( request.method === "GET" && request.path.indexOf("edit") < 0 ) {
		return true;
	}

	if ( typeof img.owner == "undefined") {
		return false;
	}

	if ( img.owner._id.toString() == response.locals.user._id ) {
		return true;
	}

	return false;
}
var User = require('../models/user')

module.exports.login = ( req, res ) => {
  if ( req.method == 'GET' ) {
    	res.render("login")
	} else {
    var credentials = {
  		email : req.body.email,
  		password : req.body.password
  	}

  	User.findOne(credentials, ( err, user_doc ) => {
  		if ( user_doc ) {
  			req.session.user_id = user_doc._id
  			res.redirect("/app")
  		}
  	})
  }
}

module.exports.signup = ( req, res ) => {
  if ( req.method == 'GET' ) {
    User.find( (err, doc) => {
      res.render("signup")
    })
  } else {
    var data_user = {
  		email : req.body.email,
  		password : req.body.password,
  		password_confirmation : req.body.password_confirmation,
  		username : req.body.username
  	}

  	var user = new User( data_user )

  	user.save().then(
  		( us ) => {
  			res.redirect("/app")
  		} ,
  		( err ) => {
  			if ( err ) {
  				console.log( String( err ) )
  				res.send("No pudimos guardar la informacion")
  			}
  		}
  	);
  }
}

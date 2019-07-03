var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var User = require('./models/user').User
var session = require('express-session')
var router_app = require('./routes_app')
var session_middleware = require('./middlewares/session')
var formidable = require('express-form-data')
var methodOverride = require('method-override')
var redis_store = require('connect-redis')(session)
const expressValidator = require('express-validator')
var http = require('http')
var real_time = require('./realtime')

var app = express()
var server = http.Server(app)


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
	extended: true 
}));

var session_middleware_store = session({
	store: new redis_store({}),
	secret : 'secret_word'
}) 

real_time(server, session_middleware_store)

app.use( session_middleware_store )

app.use( methodOverride("_method") )

app.use( formidable.parse({
	keepExtensions : true
}))

app.use( expressValidator() )

app.set("view engine", "jade")

app.get("/", ( request, response ) => {
	response.render("index")
})

app.get("/signup", ( request, response ) => {
	User.find( (err, doc) => {
		response.render("signup")
	})
})

app.get("/login", ( request, response ) => {
	response.render("login")
})

app.post("/users", ( request, response ) => {
	
	var data_user = {
		email : request.body.email,
		password : request.body.password,
		password_confirmation : request.body.password_confirmation,
		username : request.body.username
	}

	var user = new User( data_user )

	user.save().then( 
		( us ) => {
			response.redirect("/app")
		} , 
		( err ) => {
			if ( err ) {
				console.log( String( err ) )
				response.send("No pudimos guardar la informacion")
			}
		}
	);
});
/** Iniciar sesion **/
app.post("/sessions", ( request, response ) => {	

	var credentials = { 
		email : request.body.email,	
		password : request.body.password 
	}

	User.findOne(credentials, ( err, user_doc ) => {
		if ( user_doc ) {
			request.session.user_id = user_doc._id
			response.redirect("/app")  
		}
	})
})

app.use("/app", session_middleware)
app.use("/app", router_app)
server.listen( 8080 , () => { console.log('Escuchando por el puerto 8080!!') } ) 
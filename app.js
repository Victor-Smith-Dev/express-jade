var express = require("express");
var bodyParser = require("body-parser");

//se importan los modelos 
var User = require("./models/user").User; 

var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var formidable = require("express-form-data");
var methodOverride = require("method-override");

var app = express();

//servir archivos estaticos
app.use("/static", express.static('public') );
app.use(bodyParser.json()); //para peticiones tipo application/json
app.use(bodyParser.urlencoded({ 
	extended: true 
}));

app.use(cookieSession({
	name : "Session",
	keys : [
		"llave-1", 
		"llave-2"
	]
}));
//se aplica el method-override para editar regitros
app.use( methodOverride("_method") );

app.use( formidable.parse({
	keepExtensions : true
}));

app.set("view engine", "jade");

app.get("/", ( request, response ) => {
	response.render("index");
});

app.get("/signup", ( request, response ) => {
	User.find( (err, doc) => {
		response.render("signup");
	});
});

app.get("/login", ( request, response ) => {
	response.render("login");
});
/**Registrar usuario**/
app.post("/users", ( request, response ) => {
	
	var data_user = {
		email : request.body.email,
		password : request.body.password,
		password_confirmation : request.body.password_confirmation,
		username : request.body.username
	};

	var user = new User( data_user );

	user.save().then( 
		( us ) => {
			response.redirect("/app"); 
		} , 
		( err ) => {
			if ( err ) {
				console.log( String( err ) );
				response.send("No pudimos guardar la informacion");
			}
		}
	);
});
/** Iniciar sesion **/
app.post("/sessions", ( request, response ) => {	

	var credentials = { 
		email : request.body.email,	
		password : request.body.password 
	};

	User.findOne(credentials, ( err, user_doc ) => {
		if ( user_doc ) {
			request.session.user_id = user_doc._id;
			response.redirect("/app");  
		}
	});
});

app.use("/app", session_middleware)
app.use("/app", router_app);
app.listen( 8080 ) ;
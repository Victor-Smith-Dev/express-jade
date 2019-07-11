var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var session = require('express-session')

var router_images = require('./routes/images')
var router_index = require('./routes/index')
var auth_routes = require('./routes/auth')

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

app.use("/app", session_middleware)
app.use("/app", router_images)
app.use("/auth", auth_routes)
app.use("/", router_index)

server.listen( 8080 , () => { console.log('Escuchando por el puerto 8080!!') } )

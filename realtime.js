module.exports = (server, sessionMiddleware) => {
	var io = require("socket.io")( server )
	var redis = require('redis')
	var client = redis.createClient()
	//
	client.subscribe('images')
	//
	io.use( ( socket, next ) => {
		sessionMiddleware(socket.request, socket.request.res, next)
	});
	//
	client.on('message', ( channel, message ) => {
		if ( channel == 'images') {
			io.emit('new_image', message)
		}
	})
	//
	io.sockets.on( "connection", ( socket ) => {
		//console.log( socket.request.session.user_id )
	});
}
var socket = io();

socket.on('new_image', (data) => {
	data = JSON.parse(data)
	var container = document.querySelector('#images')
	var source = document.querySelector('#image-template').innerHTML
	var template = Handlebars.compile(source)

	container.innerHTML = template(data) + container.innerHTML
})
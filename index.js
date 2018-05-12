require('dotenv').config()

const express = require('express')
			axios = require('axios')
			app = new express()
			port = process.env.PORT || 3000;

app.get('/', function(req, res) {
	res.send('Hey');
});

app.get('/post', function(req, res) {
	axios.post('https://graph.facebook.com/v2.6/me/photos', {
		access_token: process.env.FB_ACCESS_TOKEN,
		caption: 'Hello world',
		url: 'https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_960_720.jpg'
	}).then(response => {
		res.send(response.data)
	});
})

app.listen(port, function () {
	console.log(`Listening on port ${port}!`)
})

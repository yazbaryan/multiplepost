require('dotenv').config()

const express = require('express')
			app = new express()
			port = process.env.PORT || 3000;

app.get('/', function(req, res) {
	res.send('Hey');
})

app.use('/social', require('./routes/social'))

app.listen(port, function () {
	console.log(`Listening on port ${port}!`)
})

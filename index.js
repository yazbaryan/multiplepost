require('dotenv').config()

const express = require('express')
			bodyParser = require('body-parser')
			path = require('path')
			app = new express()
			port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
	extended: true,
	limit: '50mb'
}))

app.use(bodyParser.json({
	limit: '50mb'
}))

app.use(express.static(__dirname + '/public'));
app.use('/social', require('./routes/social'))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.listen(port, function () {
	console.log(`Listening on port ${port}!`)
})

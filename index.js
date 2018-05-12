const express = require('express');
const app = new express();
const port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.send('Hey');
});

app.listen(port, function () {
	console.log(`Listening on port ${port}!`)
})
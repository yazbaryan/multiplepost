const express = require('express'),
			router = express.Router(),
			social = require('../lib/social')

router.get('/upload', function(req, res) {
	social.upload().then(data => {
		res.send(data)
	})
})

router.get('/info', function(req, res) {
	social.getData().then(data => {
		res.send(data)
	})
})

module.exports = router

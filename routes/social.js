const express = require('express'),
			router = express.Router(),
			multer  = require('multer')
			upload = multer()
			social = require('../lib/social')

router.post('/upload', upload.fields([{name: 'image'}]), function(req, res) {
	social.upload(req)
	.then(data => {
		res.send(data)
	})
	.catch(err => {
		res.status(500).send(err)
	})
})

router.get('/info', function(req, res) {
	social.getData()
	.then(data => {
		res.send(data)
	})
})

module.exports = router

var express = require('express')
	, router = express.Router()
	, multer = require('multer')

var uploading = multer({
	dest: __dirname+"\\..\\public\\uploads",
	limits: {fileSize: 10000000},
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...')
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path)
	}
}).array('picture');

router.post('/upload', uploading, function(req, res, next) {
	console.log(req);
	res.render('index', {
		files: req.files || [req.file]
	});
	res.status(204).end();
})

module.exports = router
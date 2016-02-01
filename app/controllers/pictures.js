const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const Picture = mongoose.model('Picture');
const sharp = require('sharp');
const http = require('http');

var uploading = multer({
	dest: __dirname+"/../../resources/uploads",
	limits: {fileSize: 10000000},
}).array('picture');

router.post('/upload', uploading, function(req, res, next) {
	var picture, file;
	// upload files and make screen and thumbnail versions
	for (i in req.files) {
		file = req.files[i];
		picture = new Picture({ filename: file.filename, original_name: file.original_name, mimetype: file.mimetype });
		sharp(req.files[i].path)
		.resize(150, 150)
		.rotate()
		.toFormat('jpeg')
		.quality(50)
		.toFile(__dirname+'/../../resources/thumbnails/'+req.files[i].filename, function(err) {
			console.log(err);
		});
		sharp(req.files[i].path)
		.resize(1920, 1080)
		.rotate()
		.max()
		.toFormat('jpeg')
		.toFile(__dirname+'/../../resources/screen/'+req.files[i].filename, function(err) {
			console.log(err);
		});
		picture.save();
	}
	// return home
	res.redirect('/')
})

module.exports = router
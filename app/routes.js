const express = require('express');
const app = express();
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const Picture = mongoose.model('Picture');
const sharp = require('sharp');
const http = require('http');

function getPictures(res) {
	Picture.find().sort({date_added: -1}).exec(function(err, pictures) {
		if (err) res.send(err);

		res.json(pictures);
	});
}

function getPicture(res, id) {
	// show all pictures in background and picture by id in modal window
	var picture;
	Picture.find(function(err, pictures) {
		if (err) res.send(err);

		for (i in pictures) {
			i = parseInt(i);
			if (pictures[i].filename === id) {
				picture = pictures[i];
				if (pictures.length > 1) {
					if (i > 0) picture.previous = pictures[i-1];
					else picture.previous = pictures[pictures.length-1];

					if (i < pictures.length-1) picture.next = pictures[i+1];
					else picture.next = pictures[0];
				}
				break;
			}
		}
		if (picture) res.json(picture);
		else res.sendStatus(404);
	});
}

function getPictureFile(res, id, path) {
	Picture.findOne({filename: id}, function(err, picture) {
		if (err) console.error(err);
		if (!picture) return; // 404
		res.setHeader('Content-Type', picture.mimetype);
		fs.createReadStream(__dirname+'/../resources/'+path+'/'+picture.filename).pipe(res);
	});
}

module.exports = function(app) {

var uploading = multer({
	dest: __dirname+"/../../resources/uploads",
	limits: {fileSize: 10000000},
}).array('picture');

app.get('/api/pictures', function (req, res) {
	getPictures(res);
});

app.post('/api/pictures', uploading, function(req, res, next) {
	var picture, file;
	// upload files and make screen and thumbnail versions
	for (i in req.files) {
		file = req.files[i];
		picture = new Picture({ filename: file.filename, original_name: file.original_name, mimetype: file.mimetype });
		sharp(req.files[i].path)
		.resize(150, 150)
		.rotate()
		.toFormat('jpeg')
		.quality(70)
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

	res.json(pictures);
});

app.post('/api/pictures/comment', function(req, res, next) {
	Picture.findOne({filename: req.body.id }).exec(function(err, picture) {
		picture.addComment(req.body);

		res.json(picture);
	});
});

app.get('/api/picture/:id', function(req, res) {
	getPicture(res, req.params.id);
});

app.delete('/api/picture/:id', function(req, res) {
	Picture.remove({
		file_id: req.params.id
	}, function(err, picture) {
		if (err) res.send(err);

		getPictures(res);
	});
});

app.get('/pictures/thumbnail/:id', function (req, res) {
	getPictureFile(res, req.params.id, 'thumbnails');
});

app.get('/pictures/screen/:id', function (req, res) {
	getPictureFile(res, req.params.id, 'screen');
});

app.get('/pictures/original/:id', function (req, res) {
	getPictureFile(res, req.params.id, 'uploads');
});

app.get('/picture/:id', function(req, res) {
	fs.createReadStream(__dirname+'/../public/index.html').pipe(res);
})
}
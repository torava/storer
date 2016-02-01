const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Picture = mongoose.model('Picture');
const Comment = mongoose.model('Comment');

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))
router.use('/pictures', require('./pictures'))

router.get('/picture/:id', function(req, res) {
	Picture.find().sort({date_added: -1}).exec(function(err, pictures) {
		if (err) return console.error(err);
		for (i in pictures) {
			i = parseInt(i);
			if (pictures[i].filename === req.params.id) {
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
		res.render('index', {pictures:pictures, picture: picture });
	});
})

// tuplatreffit

router.get('/', function(req, res) {
	Picture.find().sort({date_added: -1}).exec(function(err, pictures) {
		if (err) return console.error(err);
		res.render('index', {pictures:pictures, picture: false});
	});
})

module.exports = router
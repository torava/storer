const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Picture = mongoose.model('Picture');
const sharp = require('sharp');

router.post('/send', function(req, res, next) {
	Picture.findOne({filename: req.body.ref }).exec(function(err, picture) {
		picture.addComment(req.body);

		res.redirect('/picture/'+req.body.ref)
	})
})

module.exports = router
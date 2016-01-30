var express = require('express')
  , router = express.Router()

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))
router.use('/pictures', require('./pictures'))

router.get('/', function(req, res) {
  Picture.find(function(err, pictures) {
  	if (err) return console.error(err);
  	res.render('index', pictures);
  });
})

module.exports = router
var express = require('express')
	, app = express()
	, bodyParser = require('body-parser')
	, port = process.env.PORT || 3000

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3001/test');

var picturesSchema = mongoose.Schema({
	name: String
});

var Picture = mongoose.model('Picture', picturesSchema);

app.set('views', __dirname + '/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('./controllers'))

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
		app.listen(port, function() {
			console.log('Listening on port ' + port)
		})
});
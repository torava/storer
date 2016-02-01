const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const models = __dirname+'/app/models';

// get models

fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(models+'/'+file));

const Picture = mongoose.model('Picture');

// serve pictures

app.get('/pictures/thumbnail/:id', function (req, res) {
	var picture = Picture.findOne({filename: req.params.id}, function(err, picture) {
		if (err) console.error(err);
		res.setHeader('Content-Type', picture.mimetype);
		fs.createReadStream(__dirname+'/resources/thumbnails/'+picture.filename).pipe(res)
	})
})

app.get('/pictures/original/:id', function (req, res) {
	var picture = Picture.findOne({filename: req.params.id}, function(err, picture) {
		if (err) console.error(err);
		res.setHeader('Content-Type', picture.mimetype);
		fs.createReadStream(__dirname+'/resources/uploads/'+picture.filename).pipe(res)
	})
})

app.get('/pictures/screen/:id', function (req, res) {
	var picture = Picture.findOne({filename: req.params.id}, function(err, picture) {
		if (err) console.error(err);
		res.setHeader('Content-Type', picture.mimetype);
		fs.createReadStream(__dirname+'/resources/screen/'+picture.filename).pipe(res)
	})
})

// get views

app.set('views', __dirname + '/app/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

// serve public directory

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// get controllers

app.use(require('./app/controllers'))

// connect

connect()
.on('error', console.error.bind(console, 'connection error:'))
.on('disconnected', connect)
.once('open', listen);

function connect() {
	var options = {
		server: {
			socketOptions: {
				keepAlive: 1
			}
		},
		user: 'user',
		pass: 'password'
	};
	return mongoose.connect('mongodb://localhost:27017/storer', options).connection;
}

function listen() {
	app.listen(port, function() {
		console.log('Listening on port ' + port)
	})
}
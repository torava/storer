const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require(__dirname+'/app/config');

const port = config.port;

const mongoose = require('mongoose');
const models = __dirname+'/app/models';
app.set('views', __dirname + '/app/views');

// get models

fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(models+'/'+file));

const Picture = mongoose.model('Picture');

/* get views

app.set('views', __dirname + '/app/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')*/

// serve public directory

app.use(express.static(__dirname + '/public'))

// use json

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// get controllers

//app.use(require('./app/controllers'))

require('./app/routes.js')(app);

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
	return mongoose.connect(config.db, options).connection;
}

function listen() {
	app.listen(port, function() {
		console.log('Listening on port ' + port)
	})
}
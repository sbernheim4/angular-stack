'use strict';
const path = require('path');
const express = require('express');
const app = express();
const chalk = require('chalk');
const blue = chalk.blue;
const red = chalk.red;
var port = 1337;

// folder to serve public files --> css, img, etc
app.use(express.static(__dirname + '/public'));

app.get('/*', function (req, res) {
	console.log(blue('Request for: ' + req.path));
	res.sendFile(__dirname + '/index.html');
});
// Error catching endware.
app.use(function (err, req, res, next) {
	console.log(red(err));
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// listen on the port for incoming requests
app.listen(port, function() {
	console.log('Listening to port ', port);
});

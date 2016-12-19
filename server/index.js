'use strict';
var path = require('path');
var express = require('express');
var app = express();
var chalk = require('chalk');
var http = require('http');

// require the app.js which initializes the angular app
/*var pomodoro = require(path.join(__dirname, '../browser/js/app.js'));*/

var blue = chalk.blue;
var red = chalk.red;
var port = 1337;

function handleRequest(req, res) {
	res.end ("It Works! Path hit: " + req.url);
}

var server = http.createServer(handleRequest);

server.listen(port, function() {
	console.log("Server listening on localhost:" + port);
});

/*
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
});*/

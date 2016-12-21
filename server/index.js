'use strict';
var path = require('path');
var express = require('express');
var app = express();
var port = 1337;

// folder to serve public files --> css, img, etc
app.use(express.static(path.join(__dirname, '/public')));

app.get('/js/timer/timer.template.html', function(req, res) {
	res.sendFile(path.join(__dirname, '/../browser/js/timer/timer.template.html'));
});

/*app.use(function (req, res, next) {
	if (req.path !== '/browser/js/app.js'&&  path.extname(req.path).length > 0) {
		console.log(req.path);
		res.status(404).end();
	} else {
		next();
	}
});*/

// for any get request return the index.html file
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});

// listen on the port for incoming requests
app.listen(port, function() {
	console.log('Listening to port:', port);
});

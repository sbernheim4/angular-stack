'use strict';

require('dotenv').config()
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const port = process.env.PORT || 1337;

// folder to serve public files --> css, img, etc
app.use(express.static(path.join(__dirname, 'public')));

/*
 * Serve all the files in ../browser/ staticlly as well --> Needed since the
 * html template files must be served statically so that they can be accessed
 * by the browser on a GET request
 */
app.use(express.static(path.join(__dirname, '../browser/')));

// For any get request return the index.html file
app.get('/*', function (req, res) {

	/* Log all get requests for files that don't have a `.` in them -->
	 * Excludes images and other files not helpful for development
	 */
	if (!req.originalUrl.includes('.')){
		console.log(chalk.yellow("GET: " + req.originalUrl));
	}

	/* Return the index.html file and hand over the routing to Angular's UI-Router */
	res.sendFile(path.join(__dirname, '/index.html'));
});

let db;
const url = process.env.DB_URI;

MongoClient.connect(url, (err, database) => {

	if (err) {
		console.log(err);
	} else {
		console.log(chalk.blue(`Connected to database`));
		db = database;

		app.listen(port, () => {
			// start the server upon successful connection to mongodb
			console.log(`Listening on port: ${port}`);
		});
	}
});

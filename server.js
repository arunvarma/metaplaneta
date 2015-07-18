/*
 * server.js
 * Node.js server for Metaplaneta site.
 * Author: Arun Varma
 * Date: July 3, 2015
 */

// PACKAGES.
var express = require('express');
var bodyParser = require('body-parser');


// CONFIGURATIONS.
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

var engines = require('consolidate');
app.engine('html', engines.hogan);
app.set('views', __dirname + '/templates');

app.listen(8080);


// HTTP REQUESTS.
// GET requests.
// Landing page as home.
app.get('/', function(request, response) {
  response.render('landing.html');
});

// Default: redirect to landing page.
app.get('*', function(request, response) {
  response.redirect('/');
});

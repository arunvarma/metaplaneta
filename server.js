/*
 * server.js
 * Node.js server for Metaplaneta site.
 * Author: Arun Varma
 * Date: July 3, 2015
 */

// PACKAGES.
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var moment = require('moment');
var bcrypt = require('bcrypt');
var session = require('express-session');
var anyDB = require('any-db');
var engines = require('consolidate');
var config = require('./config');
var sqlite_store = require('connect-sqlite3')(session);


// CONFIGURATIONS.
var app = express();

app.use(multer({ dest: config.PATH_FILE }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

var conn = anyDB.createConnection(config.PATH_DATABASE);

app.engine('html', engines.hogan);
app.set('views', __dirname + config.PATH_TEMPLATE);

var session_store = new sqlite_store({ table: config.PATH_SESSION_DATABASE });
app.use(session({
  name: config.COOKIE_SESSION_NAME,
  secret: config.COOKIE_SIGN_SECRET,
  store: session_store,
  saveUninitialized: false,
  resave: false
}));

app.listen(config.NUM_PORT);


// HTTP REQUESTS.
// GET requests.
// .
app.get('/', function(request, response) {
  ;
});

// Default: .
app.get('*', function(request, response) {
  ;
})


// POST requests.
// Add user to database.
app.post('/user/', function(request, response) {
  ;
});

// Event creation.
app.post('/event/', function(request, response) {
  ;
});

// Default: .
app.post('*', function(request, response) {
  ;
});

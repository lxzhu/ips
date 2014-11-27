var conf=require('./conf.js');
var express = require('express');

var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var redirect = require('express-redirect');
var http = require('http');
var path = require('path');

var app = express();
redirect(app);

app.set('port', process.env.PORT || 12000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//favicon is removed. could use https://www.npmjs.org/package/static-favicon
//app.use(express.favicon()); 
//TODO: how to config so it log to file?
//app.use(express.logger('dev'));
//app.use(express.json());
//TODO: how to config it to allow url rewrite?
//app.use(express.urlencoded());
//app.use(express.query());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
//app.use(express.methodOverride());
//app.use(app.router);
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.redirect('/docs','/docs/index.html');
app.redirect('/docs/','/docs/index.html');
app.redirect('/','/docs/index.html');

http.createServer(app).listen(app.get('port'), function(error) {
	if (error) {
		console.log(error);
	}
});
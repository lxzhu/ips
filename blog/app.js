var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var express = require('express');
var redirect = require('express-redirect');
var marked = require('marked');
var highlight = require('highlight.js')
var app = express();
redirect(app);

marked.setOptions({
	renderer : new marked.Renderer(),
	gfm : true,
	tables : true,
	breaks : false,
	pedantic : false,
	sanitize : true,
	smartLists : true,
	smartypants : false
});
app.set('port', process.env.PORT || 8000);
app.redirect('/', '/articles/index.html');

app.get('/articles/:slug.html', function(req, res) {
	var filename = req.params.slug + ".md";
	console.log("filename:" + filename);
	filename = path.resolve("./markdown", filename);
	console.log("resolve filename:" + filename);
	loadMarkdown(filename)(req, res);
});

function loadMarkdown(filename) {
	return function(req, res) {
		fs.readFile(filename, {
			encoding : "utf8",
			flag : "r"
		}, function(e, data) {
			if (e) {
				res.end(JSON.stringify(e));
			} else {
				res.writeHead({
					"Content-Type" : "text/html"
				});
				res.end(marked(data));
			}
		});
	}
}
http.createServer(app).listen(app.get('port'), function(error) {
	if (error) {
		console.log(error);
	} else {
		console.log("nodejs is running at " + app.get('port'));
	}
});
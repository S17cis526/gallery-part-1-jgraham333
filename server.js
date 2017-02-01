"use strict";

/** Justin Graham - cis526 in class web server example */

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
 
var fs = require('fs');
var http = require('http');
var port = 3000;

var stylesheet = fs.readFileSync('gallery.css');

var imageNames = ['ace.jpg', 'bubble.jpg', 'chess.jpg', 'fern.jpg', 'mobile.jpg'];

function serveImage(filename, req, res){

	var body = fs.readFile('images/' + filename, function(err, body) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.statusMessage = "Server Error";
			res.end("Silly me");
			return;
		}
		res.setHeader("Content-Type", "image/jpeg");
		res.end(body);		
	});
}

var server = http.createServer(function(req, res){

	switch(req.url){
		case '/gallery':
			var gHtml = imageNames.map(function(fileName){
					return '<img src="' + fileName + '" alt="finishing ' + fileName + ' at work">';
				}).join(' ');
			var html = '<!doctype html>';
				html += '<head>'
				html += '	<title>Dynamic Page</title>';
				html += '	<link href="gallery.css" rel="stylesheet" type="text/css">';
				html +=	'</head>';
				html += '<body>';
				html += '	<h1>Gallery</h1>';
				html += gHtml;
				html += '	<h1>Hello.</h1> Time is ' + Date.now();
				html += '</body>';
			res.setHeader('Content-Type', 'text/html');
			res.end(html);
			break;
		case '/gallery.css':
			res.setHeader('Content-Type', 'text/css');
			res.end(stylesheet);
			break;
		case "/chess":
		case "/chess/":
		case "/chess.jpg":
		case "/chess.jpeg":
			serveImage("chess.jpg", req, res);
			break;
		case "/fern":
		case "/fern/":
		case "/fern.jpg":
		case "/fern.jpeg":
			serveImage("fern.jpg", req, res);
			break;
		case "/ace":
		case "/ace/":
		case "/ace.jpg":
		case "/ace.jpeg":
			serveImage("ace.jpg", req, res);
			break;
		case "/bubble":
		case "/bubble/":
		case "/bubble.jpg":
		case "/bubble.jpeg":
			serveImage("bubble.jpg", req, res);
			break;
		case "/mobile":
		case "/mobile/":
		case "/mobile.jpg":
		case "/mobile.jpeg":
			serveImage("mobile.jpg", req, res);
			break;
		default:
			res.statusCode = 404;
			res.statusMessage = "Not found";
			res.end();
	}
	
});

server.listen(port, function(){

	console.log("Listening on Port " + port);

});


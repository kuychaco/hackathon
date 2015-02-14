var http = require('http');
// var phaser = require('phaser');
var fs = require('fs');

var express = require('express');
var app = express();

//global host variable
host = process.env.IP || "127.0.0.1";

app.get('/data', function(req, res) {
	console.log("asdf");
	res.json({data: "some temp data"});
});
app.get('/data/:id', function(req, res) {
	console.log(req.params.id);
	res.json({data: "some temp data"});
});
app.use(express.static(__dirname + '/client'));

app.listen(process.env.PORT || 3000);
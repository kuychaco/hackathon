var http = require('http');
// var phaser = require('phaser');
var fs = require('fs');
var config = require('./config/environment');

var express = require('express');
var app = express();

app.get('/search/:id', function(req, res) {
	var util = require('util'),
    OperationHelper = require('apac').OperationHelper;
	// console.log(config.amazon.clientID, "asdf");
	var opHelper = new OperationHelper({
	    awsId:     config.amazon.clientID,
	    awsSecret: config.amazon.clientSecret,
	    assocId:   config.amazon.clientAccount 
	});
	opHelper.execute('ItemSearch', {
	  'SearchIndex': 'Books',
	  'Keywords': req.params.id,
	}, function(err, results) {
		console.log(results);
		var r = results.ItemSearchResponse.Items[0];
	    // var r = JSON.stringify(results.ItemSearchResponse);
	    res.json(JSON.stringify({data: {ASIN: r.Item[0].ASIN, productName: r.Item[0].ItemAttributes[0].Title}}));
	});
});

app.get('/data/:id', function(req, res) {
	var util = require('util'),
    OperationHelper = require('apac').OperationHelper;
	 
		var opHelper = new OperationHelper({
		    awsId:     config.amazon.clientID,
		    awsSecret: config.amazon.clientSecret,
		    assocId:   config.amazon.clientAccount 
		});

		opHelper.execute('SimilarityLookup', {
		  'ItemId': req.params.id,
		}, function(err, results) {
			// var r = results.ItemSearchResponse.Items[0];
		    // var r = JSON.stringify(results.ItemSearchResponse);
		    console.log(results);
		    res.json(JSON.stringify({data: results.Items}));
		});
	
});
app.get('/data', function(req, res) {
	console.log("asdf");
	res.json({data: "some temp data"});
});
app.use(express.static(__dirname + '/client'));

app.listen(process.env.PORT || 3000);
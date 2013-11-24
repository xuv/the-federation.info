var express = require('express'),
    mysql = require('mysql'),
    https = require('https'),
    util = require('util'),
    expressValidator = require('express-validator'),
    config = require('./config.js');
var app = express();

app.set('title', 'Diaspora* Hub');
app.use(expressValidator([]));

app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('diaspora* hub at your service');
});

app.get('/register/:podhost', function(req, res) {
    console.log(req.ip);
    
    req.assert('podhost', 'Invalid pod url').isUrl().len(1, 100);
    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors: ' + util.inspect(errors), 400);
        return;
    }

    var options = {
        host: req.params.podhost,
        port: 443,
        path: '/statistics.json',
        method: 'GET'
    };
    var request = https.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
           console.log('BODY: ' + chunk);
        });
    });
    request.end();
    request.on('error', function(e) {
        console.error(e);
    });
    
    res.type('text/plain');
    res.send('register received');
});

app.listen(process.env.PORT || 4730);

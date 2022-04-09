'use strict';

var port = process.env.PORT || 1337;
var http = require('http');
var fs = require('fs');

//const { dirname } = require('path');
//var path = require('path')


function onRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File Not Found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

http.createServer(onRequest).listen(1337)
//server.use(express.static('public'));

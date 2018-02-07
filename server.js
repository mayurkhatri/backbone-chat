// const express = require('express'),
//   app = express(),
//   port = 8080, mainController = require('./app/controllers/main.controller');


// app.get('/', mainController.showHome);
// app.get('/insertRecord', mainController.insertRecord);

// app.listen(port, () => {
//   console.log('App listening');
// })

var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors/safe');
var getColor = require('./randomColor');
var mainController = require('./app/controllers/main.controller');

var messages = [];

var app = express();
app.use(express.static(__dirname + '/ui'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/', mainController.getAllRecords);
app.post('/insertRecord', mainController.insertRecord);
var server = require('http').createServer(app).listen(3210);

// Add Socket IO to your server
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    socket.once('disconnect', function(data) {
        socket.disconnect();
    });

    socket.on('message', function (data) {
        console.log(colors[data.color](data.user + ": " + data.message));
        io.sockets.emit('message', data);
        messages.push(data);
    });

    socket.emit('welcome', { oldMessages: messages, yourColor: getColor() });

});

console.log(colors.bgBlue(colors.yellow("Chat Server running at 'http://localhost:3210'")));
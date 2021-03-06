
/*
 * Metagaming
 */

var express = require('express');

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);

app.configure(function () {
  app.use('/static', express.static(__dirname + '/bower_components'));
  app.use('/static', express.static(__dirname + '/resources'));
});

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});


var usernames = [];
var messages = [];

io.sockets.on('connection', function(socket) {
  socket.on('user-connect', function(data) {
    usernames.push(data['user']);
    socket.emit('connected-users', { users: usernames });
    socket.broadcast.emit('connected-users', { users: usernames });
  });
  socket.on('user-disconnect', function(data) {
    usernames.splice(usernames.indexOf(data['user']), 1);
    socket.emit('connected-users', { users: usernames });
    socket.broadcast.emit('connected-users', { users: usernames });
  });
  socket.on('send-chat', function(data) {
    messages.push(data);
    socket.emit('receive-chat', { status: 'ready', message: data});
    socket.broadcast.emit('receive-chat', { status: 'ready', message: data});
  });
});

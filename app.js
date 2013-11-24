
/**
 * Module dependencies.
 */

/*
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
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

const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const io =  require('socket.io')(server);

app.use(express.static(path.join(__dirname+"/public")))

io.on('connection', function(socket){
  socket.on('newuser', function(username){
      socket.broadcast.emit('update', username + ' ' + 'joined the convertation')
  })
  socket.on('exituser', function(username){
    socket.broadcast.emit('update', username + 'left the convertation')
  })
  socket.on('chat', function(message){
    socket.broadcast.emit('chat', message)
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
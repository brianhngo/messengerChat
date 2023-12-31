const Users = require('../db/Users.js');
const Channel = require('../db/Messages.js');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-message', (message) => {
      socket.broadcast.emit('new-message', message);
    });

    socket.on('new-channel', (channel) => {
      socket.broadcast.emit('new-channel', channel);
    });
  });
};

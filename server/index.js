const port = process.env.PORT || 3000;
const app = require('./app');

const server = app.listen(port, () => console.log(`listening on port ${port}`));

const io = require('socket.io')(server);
require('./sockets')(io);

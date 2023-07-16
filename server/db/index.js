const db = require('./db.js');
const Users = require('./Users.js');
const Messages = require('./Messages.js');

Users.hasMany(Messages);
Messages.belongsTo(Users);

module.exports = {
  db,
  Users,
  Messages,
};

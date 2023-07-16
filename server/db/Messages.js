// Messages Model

const Sequelize = require('sequelize');
const db = require('./db');

const Messages = db.define('Messages', {
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['received', 'sent']],
    },
  },
});

module.exports = Messages;

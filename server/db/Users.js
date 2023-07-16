// Users Model
const Sequelize = require('sequelize');
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const SALT_ROUNDS = 10;
const Users = db.define('Users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 15],
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

Users.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
});

Users.beforeUpdate(async (user) => {
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
});

// Returns Token after verifying username & password
Users.authenticate = async ({ username, password }) => {
  const user = await Users.findOne({
    where: {
      username: username,
    },
  });

  const status = await bcrypt.compare(password, user.password);

  if (user && status) {
    return jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: '1h' });
  } else {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

// takes in the token, and gives you that user's data
Users.byToken = async (token) => {
  const payload = jwt.verify(token, process.env.JWT);
  const user = Users.findByPk(payload.id);
  if (user) {
    return user;
  } else {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};
module.exports = Users;

const express = require('express');
const app = express();

//path
const path = require('path');

// static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api Route. /api
app.use('/api', require('./api'));

// logging middleware
const morgan = require('morgan');
app.use(morgan('dev'));
const cors = require('cors');
app.use(cors());

// Error Handler for 404
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 404).send(err.message || 'Internal server error.');
});

// sends index.html from public folder to the server whenever URL doesn't exist
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error Handler for 500
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;

const router = require('express').Router();

// /api/messages
router.use('/messages', require('./messages'));
// /api/users
router.use('/users', require('./users'));

module.exports = router;

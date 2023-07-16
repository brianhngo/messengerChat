const router = require('express').Router();
const { Messages, Users } = require('../db');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const extractUserIdFromToken = async (req, res, next) => {
  // Retrieve the JWT from the request header or wherever it is stored
  const token = req.headers.authorization;
  console.log(token);
  console.log(req.headers.authorization);
  if (token) {
    try {
      // Verify and decode the JWT
      const payload = jwt.verify(token, process.env.JWT);
      console.log(payload);
      // Extract the user ID from the decoded token
      req.userId = payload.id;

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

// GET localhost:3000/api/messages
router.get('/', async (req, res, next) => {
  try {
    const data = await Messages.findAll({
      include: Users,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET localhost:3000/api/messages/:id
router.get('/:id', extractUserIdFromToken, async (req, res, next) => {
  try {
    const id = req.userId;
    const data = await Messages.findAll({
      include: Users,
      where: {
        id: id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// POST localhost:3000/api/users

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const { body } = req.body;
    const data = await Messages.create(body);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PUT localhost:3000/api/users
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Messages.findAll({
      where: {
        id: id,
      },
    });
    data[0].update(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE localhost:3000/api/users

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Messages.findAll({
      where: {
        id: id,
      },
    });
    data[0].destroy();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;

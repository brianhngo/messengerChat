const router = require('express').Router();
const { Messages, Users } = require('../db');

// GET localhost:3000/api/users/id // returns token
router.post('/testing', async (req, res, next) => {
  try {
    const data = await Users.authenticate(req.body);

    res.status(200).send({ token: data });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// returns the User's info after checking the token
// api/users/
router.get('/', async (req, res, next) => {
  try {
    const data = await Users.byToken(req.headers.authorization);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/verifyEmailStatus', async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({
      where: {
        email: email,
      },
      attributes: ['email'],
    });

    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/verifyUsernameStatus', async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await Users.findOne({
      where: {
        username: username,
      },
      attributes: ['username'],
    });

    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/verifyForgetPassword', async (req, res, next) => {
  try {
    const data = await Users.authenticateForgetPassword(req.body);

    if (data) {
      res.status(200).json({ exists: true, forgetPWToken: data });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/ChangePassword', async (req, res, next) => {
  try {
    const data = await Users.authenticateForgetPasswordByToken(
      req.body.headers.authorization
    );

    if (data) {
      const password = req.body.headers.password;
      const userData = await Users.findOne({
        where: {
          id: data,
        },
      });

      userData.password = password;

      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST localhost:3000/api/users
router.post('/', async (req, res, next) => {
  try {
    const value = req.body;
    const data = await Users.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PUT localhost:3000/api/users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Users.findAll({
      where: {
        id: id,
      },
    });

    await data[0].update(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE localhost:3000/api/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Users.findAll({
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

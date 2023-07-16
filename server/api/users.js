const router = require('express').Router();
const { Messages, Users } = require('../db');

// GET localhost:3000/api/users
// router.get('/', async (req, res, next) => {
//   try {
//     const data = await Users.findAll();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

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

// // GET localhost:3000/api/users/id
// router.get('/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const data = await Users.findAll({
//       where: {
//         id: id,
//       },
//     });
//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// GET localhost:3000/api/users/verifyUsername
router.get('/verifyUsername', async (req, res, next) => {
  try {
    const data = await Users.findAll({
      attributes: ['username'],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET localhost:3000/api/users/verifyEmail
router.get('/verifyEmail', async (req, res, next) => {
  try {
    const data = await Users.findAll({
      attributes: ['email'],
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

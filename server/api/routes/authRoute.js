const router = require('express').Router();
const User = require('../../db/model/User');

async function requireToken(req, res, next) {
    try {
      if (!req.headers.authorization) res.status(401).send('GTFO');
      const token = req.headers.authorization;
      console.log(token)
      const user = await User.byToken(token);
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }


// get route for user login

router.get('/', requireToken, async (req, res, next) => {
    try {
      res.status(200).send(req.user);
    } catch (error) {
      next(error);
    }
});

// post route for logging in and signing up

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  await Users.authenticate({ username, password })
      .then((token) => {
          res.status(201).send({ token });
      })
      .catch((err) => {
          next(err);
      });
});

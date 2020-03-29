import express from 'express';
import passport from 'passport';
import Strategy from 'passport-local';

import { Users } from './models.js'

const checkUser = async (username, password, done) => {
  const user = await Users.findOne({ username: username, password: password});

  if (user){
    return done(null, user);
  }

  return done(null, false);
}

const createUser = async (req, res) => {
  const { username, password } = req.body;

  if ( username && password ) {
    try {
      const user = await Users.create([
        { username: username, password: password }
      ])
      return res.json(user);
    }
    catch (error) {
      // console.log(error);
      return res.status(400).send(error.errmsg);
    }
  }

  return res.status(400).send('Provide username and password!');
}

passport.use(new Strategy(checkUser));

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    return res.json(req.user)
  }
);
router.post('/register', createUser);

export default router;

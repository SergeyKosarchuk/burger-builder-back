import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';

import { Users } from './models.js'
import {
  createHashFromPassword,
  verifyPassword,
  getRandomString
} from './utils.js';

dotenv.config()

const checkUser = async (username, password, done) => {
  if (username && password) {
    const user = await Users.findOne({ username: username });

    if (user) {
      const isValidPassword = await verifyPassword(password, user.password);

      if (isValidPassword) {
        return done(null, user);
      }
      return done(null, false);
    }

    // Same response time for unknown usernames
    const rand = await getRandomString(32);
    await verifyPassword('password', rand);

    return done(null, false)
  }
  return done(null, false);
}

const createUser = async (req, res) => {
  const { username, password, age, email, address } = req.body;

  if ( username && password ) {
    try {
      const hashedPassword = await createHashFromPassword(password);
      const user = await Users.create({
        username: username,
        password: hashedPassword,
        email: email,
        age: age,
        address: address
      })
      return res.json(user);
    }
    catch (error) {
      return res.status(400).send(error);
    }
  }

  return res.status(400).send('Provide username and password!');
}

const getUserFromJWT = async (token, done) => {
  const user = await Users.findOne({ _id: token.id });

  if (user){
    return done(null, user);
  }

  return done(null, false);
}

const createJwtForUser = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    iss: process.env.JWT_ISSUER,
    aud: process.env.JWT_AUDIENCE
  };
  const secret = process.env.SECRET_KEY;
  const opts = { algorithm: 'HS256' }

  return jwt.sign(payload, secret, opts);
}

const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
}

passport.use(new LocalStrategy(checkUser));
passport.use(new passportJWT.Strategy(jwtOptions, getUserFromJWT));

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const user = req.user;
    const token = createJwtForUser(user);
    return res.json(token)
  }
);
router.post('/register', createUser);

export default router;

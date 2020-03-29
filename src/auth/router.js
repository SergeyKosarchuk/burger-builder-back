import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';

import { Users } from './models.js'

dotenv.config()

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
      return res.status(400).send(error.errmsg);
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
    id: user._id,
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

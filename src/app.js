import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import authRouter from './auth/router.js';

const app = express();
app.use(helmet())
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(authRouter);

export default app;

import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import authRouter from './auth/router.js';
import burgerBuilderRouter from './burger-builder/router.js';
import orderRouter from './orders/router.js';

const app = express();
app.use(helmet());
app.use(cors())
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(authRouter);
app.use(burgerBuilderRouter);
app.use(orderRouter);

export default app;

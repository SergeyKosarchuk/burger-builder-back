import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.js';
import { DEVELOPMENT } from './consts.js';

dotenv.config()
app.listen(process.env.PORT, () => {
  mongoose.set('debug', true);
  mongoose.Promise = Promise;
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: process.env.NODE_ENV === DEVELOPMENT,
  });
  console.log(`Started app on port ${process.env.PORT}`);
})

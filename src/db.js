import mongoose from 'mongoose';

import { DEVELOPMENT } from './consts.js';

const db = (db_url, enviroment) => {
  mongoose.set('debug', true);
  mongoose.Promise = Promise;
  return mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: enviroment === DEVELOPMENT
  });
}

export default db;

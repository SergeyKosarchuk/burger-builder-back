import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.js';

dotenv.config()
app.listen(process.env.PORT, () => {
  mongoose.set('debug', true);
  mongoose.Promise = Promise;
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  console.log(`Started app on port ${process.env.PORT}`);
})

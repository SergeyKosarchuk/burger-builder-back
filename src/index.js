import mongoose from 'mongoose';

import app from './app.js';

const DB_URL = 'mongodb://localhost/burger-builder'
const PORT = 3000
const DB_PARAMS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

app.listen(PORT, () => {
  mongoose.connect(DB_URL, DB_PARAMS);
})

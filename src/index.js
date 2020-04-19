import dotenv from 'dotenv';

import db from './db.js';
import app from './app.js';

dotenv.config()
app.listen(process.env.PORT, () => {
  db(process.env.DB_URL, process.env.NODE_ENV)
  .then(console.log(`Started app on port ${process.env.PORT}`));
})

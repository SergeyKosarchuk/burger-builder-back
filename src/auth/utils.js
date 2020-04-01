import crypto from 'crypto';

import dotenv from 'dotenv';

dotenv.config()
const DEFAULT_SALT_LENGTH = 32;
const DEFAULT_ITERATIONS_COUNT = 100000;
const DEFAULT_HASH_LENGTH = 32;
const DEFAULT_HMAC_ALORITHM = 'sha512';

const getRandomString = (length) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buf) => {
      if (err){
        reject(err);
      }
      resolve(buf.toString('hex'));
    })
  })
}

const createSaltedHash = (str, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      str, salt, DEFAULT_ITERATIONS_COUNT, DEFAULT_HASH_LENGTH,
      DEFAULT_HMAC_ALORITHM, (err, buf) => {
        if (err){
          reject(err);
        }
        resolve(buf.toString('hex'));
      }
    )
  })
}

const createHashFromPassword = async (password) => {
  const secret = process.env.SECRET_KEY;
  const salt = await getRandomString(DEFAULT_SALT_LENGTH);
  const hashedSalt = await createSaltedHash(salt, secret);
  const hashedPassword = await createSaltedHash(password, hashedSalt);

  return hashedPassword + salt;
}

const verifyPassword = async (password, hash) => {
  const secret = process.env.SECRET_KEY;
  const passwordHash = hash.slice(0, DEFAULT_HASH_LENGTH * 2);
  const salt = hash.slice(DEFAULT_HASH_LENGTH * 2, DEFAULT_SALT_LENGTH * 4);
  const hashedSalt = await createSaltedHash(salt, secret);
  const hashedPassword = await createSaltedHash(password, hashedSalt);

  return hashedPassword === passwordHash;
}

export {
  createHashFromPassword,
  verifyPassword,
  getRandomString
};

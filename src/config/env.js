const dotenv = require('dotenv')
dotenv.config()

const required = ['MONGO_URI', 'JWT_SECRET'];

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing env variable: ${key}`);
  }
});

module.exports = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES_IN || '7d',
  bcryptSalt: Number(process.env.BCRYPT_SALT || 10),
  nodeEnv: process.env.NODE_ENV || 'development'
};


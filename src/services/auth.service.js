const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const env = require('../config/env');
const ApiError = require('../utils/ApiError');


exports.register = async (data) => {

  const exists = await User.findOne({ email: data.email });

  if (exists) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashed = await bcrypt.hash(
    data.password,
    env.bcryptSalt
  );

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashed
  });

  return user;
};


exports.login = async (email, password) => {

  const user = await User.findOne({ email })
    .select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpires }
  );

  return token;
};

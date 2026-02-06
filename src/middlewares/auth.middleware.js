const jwt = require('jsonwebtoken');
const env = require('../config/env');
const ApiError = require('../utils/ApiError');

module.exports = (req, res, next) => {

  const header = req.headers.authorization;

  // No token
  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication required'));
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    req.user = decoded;

    return next();

  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};

const jwt = require('jsonwebtoken');
const env = require('../config/env');
const ApiError = require('../utils/ApiError');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication required');
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, env.jwtSecret);

    req.user = decoded;

    next();

  } catch (err) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

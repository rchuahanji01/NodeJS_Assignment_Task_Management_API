const ApiError = require('../utils/ApiError');

module.exports = (...allowed) => {
  return (req, res, next) => {
    if (!allowed.includes(req.user.role)) {
      throw new ApiError(403, 'Access denied');
    }

    next();
  };
};

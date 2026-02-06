const ApiError = require('../utils/ApiError');

module.exports = (...allowed) => {

  return (req, res, next) => {

    if (!req.user || !allowed.includes(req.user.role)) {
      return next(new ApiError(403, 'Access denied'));
    }

    return next();
  };
};

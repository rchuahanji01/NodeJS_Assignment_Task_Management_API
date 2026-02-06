const authService = require('../services/auth.service');

exports.register = async (req, res, next) => {
  try {
     

    const user = await authService.register(req.body);
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await authService.login(
      req.body.email,
      req.body.password
    );

    res.json({
      success: true,
      token
    });
  } catch (err) {
    next(err);
  }
};


const router = require('express').Router();

const ctrl = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const schema = require('../validators/auth.validator');

router.post(
  '/register',
  validate(schema.registerSchema),
  ctrl.register
);

router.post(
  '/login',
  validate(schema.loginSchema),
  ctrl.login
);

module.exports = router;

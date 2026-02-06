const router = require('express').Router();

const ctrl = require('../controllers/task.controller');

const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

const schema = require('../validators/task.validator');

router.use(auth);


router.post(
  '/',
  validate(schema.createTaskSchema),
  ctrl.createTask
);


router.get('/', ctrl.listTasks);


router.get('/:id', ctrl.getTask);


router.put(
  '/:id',
  validate(schema.updateTaskSchema),
  ctrl.updateTask
);


router.delete('/:id', ctrl.deleteTask);

module.exports = router;

const service = require('../services/task.service');



exports.createTask = async (req, res, next) => {
  try {
    const task = await service.createTask(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      data: task
    });

  } catch (e) {
    next(e);
  }
};



exports.listTasks = async (req, res, next) => {
  try {
    const result = await service.listTasks(
      req.query,
      req.user
    );

    res.json({
      success: true,
      ...result
    });

  } catch (e) {
    next(e);
  }
};



exports.getTask = async (req, res, next) => {
  try {
    const task = await service.getTaskById(
      req.params.id,
      req.user
    );

    res.json({
      success: true,
      data: task
    });

  } catch (e) {
    next(e);
  }
};



exports.updateTask = async (req, res, next) => {
  try {
    const task = await service.updateTask(
      req.params.id,
      req.body,
      req.user
    );

    res.json({
      success: true,
      data: task
    });

  } catch (e) {
    next(e);
  }
};



exports.deleteTask = async (req, res, next) => {
  try {
    await service.deleteTask(
      req.params.id,
      req.user
    );

    res.json({
      success: true,
      message: 'Task deleted'
    });

  } catch (e) {
    next(e);
  }
};

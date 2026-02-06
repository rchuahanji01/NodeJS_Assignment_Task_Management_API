
const Task = require('../models/Task');
const ApiError = require('../utils/ApiError');

exports.createTask = async (data, userId) => {
  return Task.create({
    ...data,
    userId
  });
};



exports.listTasks = async (query, user) => {
  const {
    page = 1,
    limit = 10,
    status,
    search
  } = query;

  const filter = {
    isDeleted: false
  };


  if (user.role !== 'admin') {
    filter.userId = user.userId;
  }

  if (status) {
    filter.status = status;
  }

  if (search) {
    filter.title = {
      $regex: search,
      $options: 'i'
    };
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Task.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),

    Task.countDocuments(filter)
  ]);

  return {
    data,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    totalRecords: total
  };
};


exports.getTaskById = async (id, user) => {
  const filter = {
    _id: id,
    isDeleted: false
  };

  if (user.role !== 'admin') {
    filter.userId = user.userId;
  }

  const task = await Task.findOne(filter);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  return task;
};


exports.updateTask = async (id, data, user) => {
  const task = await exports.getTaskById(id, user);

  Object.assign(task, data);

  return task.save();
};


exports.deleteTask = async (id, user) => {
  const task = await exports.getTaskById(id, user);

  task.isDeleted = true;

  return task.save();
};

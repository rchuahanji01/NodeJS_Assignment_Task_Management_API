require('dotenv').config();

const request = require('supertest');
const app = require('../app');

/* ================= MOCK SERVICE ================= */

const taskService = require('../services/task.service');

jest.mock('../services/task.service');


/* ================= MOCK AUTH MIDDLEWARE ================= */
// So we don't need real JWT in tests

jest.mock('../middlewares/auth.middleware', () => {
  return (req, res, next) => {
    req.user = {
      userId: '123',
      role: 'user'
    };
    next();
  };
});


describe('Task Controller API', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  /* ================= CREATE ================= */

  it('should create task', async () => {

    const fakeTask = {
      _id: '1',
      title: 'Test Task'
    };

    taskService.createTask.mockResolvedValue(fakeTask);


    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task'
      });


    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe('Test Task');
  });


  /* ================= LIST ================= */

  it('should list tasks', async () => {

    taskService.listTasks.mockResolvedValue({
      data: [{ title: 'Task 1' }],
      total: 1,
      page: 1,
      limit: 10
    });


    const res = await request(app)
      .get('/api/tasks');


    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
  });


  /* ================= GET ONE ================= */

  it('should get task by id', async () => {

    const fakeTask = {
      _id: '1',
      title: 'Find Me'
    };

    taskService.getTaskById.mockResolvedValue(fakeTask);


    const res = await request(app)
      .get('/api/tasks/1');


    expect(res.statusCode).toBe(200);
    expect(res.body.data._id).toBe('1');
  });


  /* ================= UPDATE ================= */

  it('should update task', async () => {

    const fakeTask = {
      _id: '1',
      status: 'completed'
    };

    taskService.updateTask.mockResolvedValue(fakeTask);


    const res = await request(app)
      .put('/api/tasks/1')
      .send({
        status: 'completed'
      });


    expect(res.statusCode).toBe(200);
    expect(res.body.data.status).toBe('completed');
  });


  /* ================= DELETE ================= */

  it('should delete task', async () => {

    taskService.deleteTask.mockResolvedValue(true);


    const res = await request(app)
      .delete('/api/tasks/1');


    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted');
  });


  /* ================= ERROR HANDLING ================= */

  it('should return 404 when task not found', async () => {

    taskService.getTaskById.mockRejectedValue({
      statusCode: 404,
      message: 'Task not found'
    });


    const res = await request(app)
      .get('/api/tasks/999');


    expect(res.statusCode).toBe(404);
  });


  it('should return 500 on service error', async () => {

    taskService.createTask.mockRejectedValue(new Error('DB error'));


    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Crash'
      });


    expect(res.statusCode).toBe(500);
  });

});

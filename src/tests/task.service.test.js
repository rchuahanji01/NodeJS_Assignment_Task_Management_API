const taskService = require('../services/task.service');

const Task = require('../models/Task');
const ApiError = require('../utils/ApiError');

/* ================= MOCK MODEL ================= */

jest.mock('../models/Task');


describe('Task Service', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  /* ===================================================
     CREATE
  =================================================== */

  describe('createTask()', () => {

    it('should create task with userId', async () => {

      const fakeTask = {
        _id: '1',
        title: 'Test Task',
        userId: '123'
      };

      Task.create.mockResolvedValue(fakeTask);


      const result = await taskService.createTask(
        { title: 'Test Task' },
        '123'
      );


      expect(Task.create).toHaveBeenCalledWith({
        title: 'Test Task',
        userId: '123'
      });

      expect(result).toEqual(fakeTask);
    });

  });


  /* ===================================================
     LIST
  =================================================== */

  describe('listTasks()', () => {

    it('should list tasks for normal user', async () => {

      const fakeTasks = [{ title: 'Task 1' }];

      // Mock find chain
      Task.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(fakeTasks)
      });

      Task.countDocuments.mockResolvedValue(1);


      const result = await taskService.listTasks(
        { page: 1, limit: 10 },
        { userId: '123', role: 'user' }
      );


      expect(Task.find).toHaveBeenCalledWith({
        isDeleted: false,
        userId: '123'
      });

      expect(result.data).toEqual(fakeTasks);
      expect(result.totalRecords).toBe(1);
    });


    it('should list all tasks for admin', async () => {

      const fakeTasks = [{ title: 'Admin Task' }];

      Task.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(fakeTasks)
      });

      Task.countDocuments.mockResolvedValue(1);


      const result = await taskService.listTasks(
        {},
        { role: 'admin' }
      );


      expect(Task.find).toHaveBeenCalledWith({
        isDeleted: false
      });

      expect(result.data).toEqual(fakeTasks);
    });


    it('should apply search filter', async () => {

      Task.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([])
      });

      Task.countDocuments.mockResolvedValue(0);


      await taskService.listTasks(
        { search: 'test' },
        { userId: '1', role: 'user' }
      );


      expect(Task.find).toHaveBeenCalledWith({
        isDeleted: false,
        userId: '1',
        title: {
          $regex: 'test',
          $options: 'i'
        }
      });
    });

  });


  /* ===================================================
     GET
  =================================================== */

  describe('getTaskById()', () => {

    it('should return task if found', async () => {

      const fakeTask = { title: 'Found' };

      Task.findOne.mockResolvedValue(fakeTask);


      const result = await taskService.getTaskById(
        '1',
        { userId: '123', role: 'user' }
      );


      expect(Task.findOne).toHaveBeenCalled();

      expect(result).toEqual(fakeTask);
    });


    it('should throw error if task not found', async () => {

      Task.findOne.mockResolvedValue(null);


      await expect(
        taskService.getTaskById(
          '1',
          { userId: '123', role: 'user' }
        )
      ).rejects.toBeInstanceOf(ApiError);
    });

  });


  /* ===================================================
     UPDATE
  =================================================== */

  describe('updateTask()', () => {

    it('should update and save task', async () => {

      const fakeTask = {
        title: 'Old',
        save: jest.fn().mockResolvedValue({
          title: 'New'
        })
      };

      jest
        .spyOn(taskService, 'getTaskById')
        .mockResolvedValue(fakeTask);


      const result = await taskService.updateTask(
        '1',
        { title: 'New' },
        { role: 'user' }
      );


      expect(fakeTask.save).toHaveBeenCalled();

      expect(result.title).toBe('New');
    });

  });


  /* ===================================================
     DELETE
  =================================================== */

  describe('deleteTask()', () => {

    it('should soft delete task', async () => {

      const fakeTask = {
        isDeleted: false,
        save: jest.fn().mockResolvedValue(true)
      };

      jest
        .spyOn(taskService, 'getTaskById')
        .mockResolvedValue(fakeTask);


      await taskService.deleteTask(
        '1',
        { role: 'user' }
      );


      expect(fakeTask.isDeleted).toBe(true);

      expect(fakeTask.save).toHaveBeenCalled();
    });

  });

});

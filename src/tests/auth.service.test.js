const authService = require('../services/auth.service');

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

/* ================= MOCKS ================= */

jest.mock('../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');


describe('Auth Service', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  /* ===================================================
     REGISTER
  =================================================== */

  describe('register()', () => {

    it('should register new user successfully', async () => {

      // No existing user
      User.findOne.mockResolvedValue(null);

      // Hash password
      bcrypt.hash.mockResolvedValue('hashed-pass');

      // Create user
      User.create.mockResolvedValue({
        _id: '123',
        name: 'Rakesh',
        email: 'test@test.com'
      });


      const result = await authService.register({
        name: 'Rakesh',
        email: 'test@test.com',
        password: '123456'
      });


      expect(User.findOne).toHaveBeenCalledWith({
        email: 'test@test.com'
      });

      expect(bcrypt.hash).toHaveBeenCalled();

      expect(User.create).toHaveBeenCalled();

      expect(result.email).toBe('test@test.com');
    });


    it('should throw error if email already exists', async () => {

      User.findOne.mockResolvedValue({
        email: 'test@test.com'
      });


      await expect(
        authService.register({
          name: 'Rakesh',
          email: 'test@test.com',
          password: '123456'
        })
      ).rejects.toBeInstanceOf(ApiError);
    });

  });


  /* ===================================================
     LOGIN
  =================================================== */

  describe('login()', () => {

    it('should login and return JWT token', async () => {

      const fakeUser = {
        _id: '123',
        role: 'user',
        password: 'hashed-pass'
      };

      // findOne().select() chain mock
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(fakeUser)
      });

      bcrypt.compare.mockResolvedValue(true);

      jwt.sign.mockReturnValue('fake-token');


      const token = await authService.login(
        'test@test.com',
        '123456'
      );


      expect(bcrypt.compare).toHaveBeenCalled();

      expect(jwt.sign).toHaveBeenCalled();

      expect(token).toBe('fake-token');
    });


    it('should throw error if user not found', async () => {

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });


      await expect(
        authService.login('x@test.com', '123456')
      ).rejects.toBeInstanceOf(ApiError);
    });


    it('should throw error if password is wrong', async () => {

      const fakeUser = {
        password: 'hashed-pass'
      };

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(fakeUser)
      });

      bcrypt.compare.mockResolvedValue(false);


      await expect(
        authService.login('test@test.com', 'wrong')
      ).rejects.toBeInstanceOf(ApiError);
    });

  });

});

require('dotenv').config();

const request = require('supertest');
const app = require('../app');

/* ================= MOCK SERVICE ================= */

const authService = require('../services/auth.service');

jest.mock('../services/auth.service');


describe('Auth Login API', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  /* ================= SUCCESS ================= */

  it('should login user and return token', async () => {

    authService.login.mockResolvedValue('fake-jwt-token');


    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: '123456'
      });


    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBe('fake-jwt-token');
  });


  /* ================= USER NOT FOUND ================= */

  it('should return 401 if user not found', async () => {

    authService.login.mockRejectedValue({
      statusCode: 401,
      message: 'Invalid credentials'
    });


    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrong@test.com',
        password: '123456'
      });


    expect(res.statusCode).toBe(401);
  });


  /* ================= WRONG PASSWORD ================= */

  it('should return 401 if password is wrong', async () => {

    authService.login.mockRejectedValue({
      statusCode: 401,
      message: 'Invalid credentials'
    });


    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'wrongpass'
      });


    expect(res.statusCode).toBe(401);
  });


  /* ================= SERVER ERROR ================= */

  it('should return 500 if service throws error', async () => {

    authService.login.mockRejectedValue(new Error('DB error'));


    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: '123456'
      });


    expect(res.statusCode).toBe(500);
  });

});

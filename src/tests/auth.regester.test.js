const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

jest.mock('../models/User');

describe('Auth API', () => {

  it('should register user', async () => {

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      _id: '123',
      email: 'test@test.com'
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Rakesh',
        email: 'test@test.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(201);
  });

});

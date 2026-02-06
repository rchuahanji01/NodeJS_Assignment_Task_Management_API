const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth.middleware');
const ApiError = require('../utils/ApiError');

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {

  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {}
    };

    res = {};

    next = jest.fn();
  });


  /* ================= NO TOKEN ================= */

  it('should return 401 if no token is provided', () => {

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.any(ApiError)
    );

    const error = next.mock.calls[0][0];

    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('Authentication required');
  });


  /* ================= INVALID FORMAT ================= */

  it('should return 401 if token format is invalid', () => {

    req.headers.authorization = 'Token abc123';

    authMiddleware(req, res, next);

    const error = next.mock.calls[0][0];

    expect(error.statusCode).toBe(401);
  });


  /* ================= VALID TOKEN ================= */

  it('should call next and attach user on valid token', () => {

    req.headers.authorization = 'Bearer validtoken';

    const fakeUser = {
      userId: '123',
      role: 'user'
    };

    jwt.verify.mockReturnValue(fakeUser);


    authMiddleware(req, res, next);


    expect(jwt.verify).toHaveBeenCalled();

    expect(req.user).toEqual(fakeUser);

    expect(next).toHaveBeenCalledWith();
  });


  /* ================= EXPIRED TOKEN ================= */

  it('should return 401 if token is invalid', () => {

    req.headers.authorization = 'Bearer badtoken';

    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });


    authMiddleware(req, res, next);


    const error = next.mock.calls[0][0];

    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('Invalid or expired token');
  });

});

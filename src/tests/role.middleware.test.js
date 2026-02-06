const roleMiddleware = require('../middlewares/role.middleware');
const ApiError = require('../utils/ApiError');

describe('Role Middleware', () => {

  let req;
  let res;
  let next;

  beforeEach(() => {

    req = {
      user: {}
    };

    res = {};

    next = jest.fn();
  });


  /* ================= ALLOWED ROLE ================= */

  it('should allow access for permitted role', () => {

    req.user.role = 'admin';

    const middleware = roleMiddleware('admin', 'manager');


    middleware(req, res, next);


    expect(next).toHaveBeenCalledWith();
  });


  /* ================= BLOCKED ROLE ================= */

  it('should block access for non-permitted role', () => {

    req.user.role = 'user';

    const middleware = roleMiddleware('admin');


    middleware(req, res, next);


    const error = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(ApiError);
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe('Access denied');
  });


  /* ================= NO USER ================= */

  it('should block if user is missing', () => {

    req.user = null;

    const middleware = roleMiddleware('admin');


    middleware(req, res, next);


    const error = next.mock.calls[0][0];

    expect(error.statusCode).toBe(403);
  });


  /* ================= MULTIPLE ROLES ================= */

  it('should allow when role is in allowed list', () => {

    req.user.role = 'manager';

    const middleware = roleMiddleware('admin', 'manager', 'editor');


    middleware(req, res, next);


    expect(next).toHaveBeenCalledWith();
  });

});

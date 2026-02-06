const errorMiddleware = require('../middlewares/error.middleware');

describe('Error Middleware', () => {

  let req;
  let res;
  let next;

  beforeEach(() => {

    req = {};

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });


  /* ================= CUSTOM ERROR ================= */

  it('should handle ApiError properly', () => {

    const error = {
      statusCode: 401,
      message: 'Unauthorized'
    };


    errorMiddleware(error, req, res, next);


    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Unauthorized'
    });
  });


  /* ================= DEFAULT ERROR ================= */

  it('should return 500 for unknown error', () => {

    const error = new Error('Something broke');


    errorMiddleware(error, req, res, next);


    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Something broke'
    });
  });


  /* ================= EMPTY ERROR ================= */

  it('should handle empty error object', () => {

    const error = {};


    errorMiddleware(error, req, res, next);


    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal Server Error'
    });
  });

});

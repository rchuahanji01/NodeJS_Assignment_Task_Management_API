const validate = require('../middlewares/validate.middleware');
const Joi = require('joi');

describe('Validate Middleware', () => {

  let req;
  let res;
  let next;

  beforeEach(() => {

    req = {
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });


  /* ================= TEST SCHEMA ================= */

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required()
  });


  /* ================= VALID BODY ================= */

  it('should call next when body is valid', () => {

    req.body = {
      name: 'Rakesh',
      email: 'r@test.com'
    };

    const middleware = validate(schema);


    middleware(req, res, next);


    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });


  /* ================= MISSING FIELD ================= */

  it('should return 400 when required field is missing', () => {

    req.body = {
      email: 'r@test.com'
    };

    const middleware = validate(schema);


    middleware(req, res, next);


    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: '"name" is required'
    });

    expect(next).not.toHaveBeenCalled();
  });


  /* ================= INVALID FORMAT ================= */

  it('should return 400 when email is invalid', () => {

    req.body = {
      name: 'Rakesh',
      email: 'not-an-email'
    };

    const middleware = validate(schema);


    middleware(req, res, next);


    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: '"email" must be a valid email'
    });
  });


  /* ================= EMPTY BODY ================= */

  it('should return 400 when body is empty', () => {

    req.body = {};

    const middleware = validate(schema);


    middleware(req, res, next);


    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

});

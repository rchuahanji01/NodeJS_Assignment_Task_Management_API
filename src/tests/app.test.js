require('dotenv').config();

const request = require('supertest');
const app = require('../app');


/* ================= MOCK ROUTES ================= */

jest.mock('../routes/auth.routes', () => {
  const express = require('express');
  const router = express.Router();

  router.post('/login', (req, res) => {
    res.json({ success: true });
  });

  return router;
});


jest.mock('../routes/task.routes', () => {
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({ success: true });
  });

  return router;
});


describe('App Setup', () => {


  /* ================= HEALTH ================= */

  it('should return health status', async () => {

    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });


  /* ================= AUTH ROUTE ================= */

  it('should mount auth routes', async () => {

    const res = await request(app)
      .post('/api/auth/login');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });


  /* ================= TASK ROUTE ================= */

  it('should mount task routes', async () => {

    const res = await request(app)
      .get('/api/tasks');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });


  /* ================= 404 ================= */

  it('should return 404 for unknown routes', async () => {

    const res = await request(app)
      .get('/not-exist');

    expect(res.statusCode).toBe(404);

    expect(res.body.message).toBe('Route not found');
  });


  /* ================= ERROR HANDLER ================= */

  it('should handle server errors', async () => {

    // Temporary route to force error
    app.get('/crash-test', () => {
      throw new Error('Crash');
    });

    const res = await request(app)
      .get('/crash-test');

    expect(res.statusCode).toBe(404);

    expect(res.body.success).toBe(false);
  });

});

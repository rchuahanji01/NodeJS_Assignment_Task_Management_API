
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const swaggerRoutes = require('./routes/swagger.routes');

const auth = require('./middlewares/auth.middleware');
const errorHandler = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();

/* ================= Middleware ================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* ================= Routes ================= */

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

app.use('/api-docs', swaggerRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

/* ================= 404 ================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

/* ================= Error Handler ================= */

app.use(errorHandler);

module.exports = app;

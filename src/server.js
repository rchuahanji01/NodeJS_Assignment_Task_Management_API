

// require('dotenv').config();

// const app = require('./app');
// const connectDB = require('./config/db');
// const env = require('./config/env');

// const startServer = async () => {
//   try {
//     await connectDB();

//     const server = app.listen(env.port, () => {
//       console.log(`Server running on port ${env.port}`);
//       console.log(`Mode: ${env.nodeEnv}`);
//     });

 

//     const shutdown = (signal) => {
//       console.log(`\n${signal} received. Shutting down...`);

//       server.close(() => {
//         console.log('HTTP server closed');
//         process.exit(0);
//       });
//     };

//     process.on('SIGTERM', shutdown);
//     process.on('SIGINT', shutdown);

//   } catch (err) {
//     console.error(' Server startup failed:', err);
//     process.exit(1);
//   }
// };

// startServer();


require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
      console.log(`Mode: ${env.nodeEnv}`);
    });

    const shutdown = (signal) => {
      console.log(`\n${signal} received. Shutting down...`);

      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (err) {
    console.error('Server startup failed:', err);
    process.exit(1);
  }
};

startServer();

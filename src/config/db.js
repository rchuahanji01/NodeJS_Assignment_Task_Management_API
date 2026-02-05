const mongoose = require('mongoose');
const env = require('./env');

const MAX_RETRIES = 5;
const BASE_DELAY = 5000; 

const connectDB = async (retryCount = 0) => {
  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(' MongoDB connected');

  } catch (err) {
    retryCount++;

    console.error(
      `MongoDB connection failed (Attempt ${retryCount}/${MAX_RETRIES})`
    );

    console.error(err.message);

    if (retryCount >= MAX_RETRIES) {
      console.error(' Max retries reached. Exiting...');
      process.exit(1);
    }

    const delay = BASE_DELAY * retryCount;

    console.log(`Retrying in ${delay / 1000}s...`);

    await new Promise((res) => setTimeout(res, delay));

    return connectDB(retryCount);
  }
};

module.exports = connectDB;

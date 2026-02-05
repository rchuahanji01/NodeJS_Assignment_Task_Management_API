const mongoose = require('mongoose');
const env = require('./env');
// console.log(env)
const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;

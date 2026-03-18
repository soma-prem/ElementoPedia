const mongoose = require('mongoose');

const connectDb = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/elementopedia';
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDb;
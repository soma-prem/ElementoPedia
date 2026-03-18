require('dotenv').config();

const app = require('./app');
const connectDb = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
});
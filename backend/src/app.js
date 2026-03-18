const express = require('express');
const cors = require('cors');

const aiRoutes = require('./routes/aiRoutes');
const elementRoutes = require('./routes/elementRoutes');

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN || "*";
app.use(
  cors({
    origin: allowedOrigin === "*" ? true : allowedOrigin.split(",").map((s) => s.trim()),
  })
);
app.use(express.json());

app.use(aiRoutes);
app.use('/elements', elementRoutes);

module.exports = app;

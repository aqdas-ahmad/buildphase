const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { errorHandler } = require('../backend/middleware/errorHandler');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', require('../backend/routes/userRoutes'));
app.use('/api/dashboard', require('../backend/routes/dashboardRoutes'));
app.use('/api/activities', require('../backend/routes/activityRoutes'));
app.use('/api/time-logs', require('../backend/routes/timeLogRoutes'));
app.use('/api/projects', require('../backend/routes/projectRoutes'));

app.use(errorHandler);

// Cache the DB connection across serverless invocations
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};

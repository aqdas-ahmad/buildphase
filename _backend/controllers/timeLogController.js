const TimeLog = require('../models/TimeLog');

// @desc    Create new time log
// @route   POST /api/time-logs
// @access  Public
const createTimeLog = async (req, res, next) => {
  try {
    const { date, jobName, hours, description } = req.body;
    
    if (!date || !jobName || !hours || !description) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const timeLog = await TimeLog.create({
      date,
      jobName,
      hours,
      description
    });

    res.status(201).json(timeLog);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all time logs
// @route   GET /api/time-logs
// @access  Public
const getTimeLogs = async (req, res, next) => {
  try {
    const logs = await TimeLog.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTimeLog, getTimeLogs };

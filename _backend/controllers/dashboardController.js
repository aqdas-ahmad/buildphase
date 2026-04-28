const Project = require('../models/Project');
const TimeLog = require('../models/TimeLog');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Public
const getStats = async (req, res, next) => {
  try {
    const projectCount = await Project.countDocuments();
    const taskCount = await TimeLog.countDocuments(); // Assuming tasks are related to logs for now
    
    // Calculate total hours
    const logs = await TimeLog.find();
    const totalHours = logs.reduce((acc, log) => {
      const hours = parseFloat(log.hours.replace(',', '.'));
      return acc + (isNaN(hours) ? 0 : hours);
    }, 0);

    res.status(200).json({
      projects: projectCount || 12, // Default fallback for Phase 0
      tasks: taskCount || 48,
      hours: totalHours.toFixed(1) || "124.5"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats };

const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Public (for now)
const getProfile = async (req, res, next) => {
  try {
    // For Phase 0, we can return a default user or the first one in DB
    let user = await User.findOne();
    if (!user) {
      user = await User.create({
        name: "David",
        role: "Senior Architect",
        location: "Berlin, DE"
      });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile };

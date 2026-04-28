const Project = require('../models/Project');

// @desc    Get active projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    let projects = await Project.find();
    
    if (projects.length === 0) {
      projects = await Project.insertMany([
        { name: "Neubau Wohnpark Süd" },
        { name: "Sanierung Altbau West" },
        { name: "Infrastruktur Projekt B" }
      ]);
    }
    
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProjects };

const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
}, { timestamps: true }));

const Project = mongoose.model('Project', new mongoose.Schema({
  name: { type: String, required: true },
}, { timestamps: true }));

const TimeLog = mongoose.model('TimeLog', new mongoose.Schema({
  date: { type: String, required: true },
  jobName: { type: String, required: true },
  hours: { type: String, required: true },
  status: { type: String, default: 'Ausstehend' },
  description: { type: String, required: true },
}, { timestamps: true }));

const Announcement = mongoose.model('Announcement', new mongoose.Schema({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  excerpt: { type: String, required: true },
  variant: { type: String, default: 'primary' },
}, { timestamps: true }));

module.exports = { User, Project, TimeLog, Announcement };

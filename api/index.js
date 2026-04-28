const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');
const { User, Project, TimeLog, Announcement } = require('./models');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// User
app.get('/api/user/profile', async (req, res) => {
  try {
    let user = await User.findOne();
    if (!user) {
      user = await User.create({ name: 'David', role: 'Senior Architect', location: 'Berlin, DE' });
    }
    res.json(user);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const logs = await TimeLog.find();
    const totalHours = logs.reduce((acc, log) => {
      const h = parseFloat(String(log.hours).replace(',', '.'));
      return acc + (isNaN(h) ? 0 : h);
    }, 0);
    res.json({ projects: projectCount || 12, tasks: logs.length || 48, hours: totalHours.toFixed(1) || '124.5' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Activities
app.get('/api/activities', async (req, res) => {
  try {
    let news = await Announcement.find().sort({ createdAt: -1 });
    if (news.length === 0) {
      news = await Announcement.insertMany([
        { tag: 'Sicherheit', title: 'Neue Sicherheitsrichtlinien für Baustellenbesuche', date: 'Vor 2 Stunden', excerpt: 'Ab sofort gelten erweiterte Sicherheitsvorkehrungen für alle Mitarbeiter...', variant: 'danger' },
        { tag: 'Unternehmen', title: 'Quartalsergebnisse Q1 und Ausblick', date: 'Heute', excerpt: 'Die DLC Bau Gruppe verzeichnet ein starkes erstes Quartal...', variant: 'success' },
      ]);
    }
    res.json(news);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Projects
app.get('/api/projects', async (req, res) => {
  try {
    let projects = await Project.find();
    if (projects.length === 0) {
      projects = await Project.insertMany([
        { name: 'Neubau Wohnpark Süd' },
        { name: 'Sanierung Altbau West' },
        { name: 'Infrastruktur Projekt B' },
      ]);
    }
    res.json(projects);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Time logs
app.get('/api/time-logs', async (req, res) => {
  try {
    const logs = await TimeLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.post('/api/time-logs', async (req, res) => {
  try {
    const { date, jobName, hours, description } = req.body;
    if (!date || !jobName || !hours || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const log = await TimeLog.create({ date, jobName, hours, description });
    res.status(201).json(log);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (e) {
    res.status(500).json({ message: 'Database connection failed', error: e.message });
  }
};

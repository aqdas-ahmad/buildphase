const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ── Models ───────────────────────────────────────────────────────────────────
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema(
  { name: String, role: String, location: String }, { timestamps: true }
));
const Project = mongoose.models.Project || mongoose.model('Project', new mongoose.Schema(
  { name: String }, { timestamps: true }
));
const TimeLog = mongoose.models.TimeLog || mongoose.model('TimeLog', new mongoose.Schema(
  { date: String, jobName: String, hours: String, status: { type: String, default: 'Ausstehend' }, description: String },
  { timestamps: true }
));
const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', new mongoose.Schema(
  { tag: String, title: String, date: String, excerpt: String, variant: { type: String, default: 'primary' } },
  { timestamps: true }
));

// ── Routes ───────────────────────────────────────────────────────────────────
app.get('/api/user/profile', async (req, res) => {
  try {
    let user = await User.findOne();
    if (!user) user = await User.create({ name: 'David', role: 'Senior Architect', location: 'Berlin, DE' });
    res.json(user);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const logs = await TimeLog.find();
    const totalHours = logs.reduce((acc, l) => acc + (parseFloat(String(l.hours).replace(',', '.')) || 0), 0);
    res.json({ projects: projectCount || 12, tasks: logs.length || 48, hours: totalHours.toFixed(1) || '124.5' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.get('/api/activities', async (req, res) => {
  try {
    let news = await Announcement.find().sort({ createdAt: -1 });
    if (!news.length) {
      news = await Announcement.insertMany([
        { tag: 'Sicherheit', title: 'Neue Sicherheitsrichtlinien für Baustellenbesuche', date: 'Vor 2 Stunden', excerpt: 'Ab sofort gelten erweiterte Sicherheitsvorkehrungen...', variant: 'danger' },
        { tag: 'Unternehmen', title: 'Quartalsergebnisse Q1 und Ausblick', date: 'Heute', excerpt: 'Die DLC Bau Gruppe verzeichnet ein starkes erstes Quartal...', variant: 'success' },
      ]);
    }
    res.json(news);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.get('/api/projects', async (req, res) => {
  try {
    let projects = await Project.find();
    if (!projects.length) {
      projects = await Project.insertMany([
        { name: 'Neubau Wohnpark Süd' },
        { name: 'Sanierung Altbau West' },
        { name: 'Infrastruktur Projekt B' },
      ]);
    }
    res.json(projects);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.get('/api/time-logs', async (req, res) => {
  try {
    res.json(await TimeLog.find().sort({ createdAt: -1 }));
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.post('/api/time-logs', async (req, res) => {
  try {
    const { date, jobName, hours, description } = req.body;
    if (!date || !jobName || !hours || !description)
      return res.status(400).json({ message: 'All fields required' });
    res.status(201).json(await TimeLog.create({ date, jobName, hours, description }));
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── DB + Export ───────────────────────────────────────────────────────────────
let connected = false;
module.exports = async (req, res) => {
  if (!connected) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      connected = true;
    } catch (e) {
      return res.status(500).json({ message: 'DB connection failed', error: e.message });
    }
  }
  return app(req, res);
};

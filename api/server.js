const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ── Models ───────────────────────────────────────────────────────────────────
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema(
  { name: String, role: String, location: String }, { timestamps: true }
));
const Project = mongoose.models.Project || mongoose.model('Project', new mongoose.Schema(
  { name: String, client: String, status: { type: String, default: 'Aktiv' }, phase: String, progress: { type: Number, default: 0 }, teamSize: { type: Number, default: 1 }, hours: { type: Number, default: 0 } },
  { timestamps: true }
));
const TimeLog = mongoose.models.TimeLog || mongoose.model('TimeLog', new mongoose.Schema(
  { date: String, jobName: String, hours: String, status: { type: String, default: 'Ausstehend' }, description: String },
  { timestamps: true }
));
const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', new mongoose.Schema(
  { tag: String, title: String, date: String, excerpt: String, variant: { type: String, default: 'primary' } },
  { timestamps: true }
));
const Task = mongoose.models.Task || mongoose.model('Task', new mongoose.Schema(
  { title: String, description: String, project: String, priority: { type: String, default: 'Mittel' }, status: { type: String, default: 'Offen' }, dueDate: String, assignee: String },
  { timestamps: true }
));
const Event = mongoose.models.Event || mongoose.model('Event', new mongoose.Schema(
  { title: String, date: String, time: String, type: { type: String, default: 'Meeting' }, project: String, description: String },
  { timestamps: true }
));
const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', new mongoose.Schema(
  { name: String, role: String, email: String, department: String, location: String, status: { type: String, default: 'Aktiv' } },
  { timestamps: true }
));
const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', new mongoose.Schema(
  { title: String, description: String, category: { type: String, default: 'Technik' }, priority: { type: String, default: 'Mittel' }, status: { type: String, default: 'Offen' }, assignee: String },
  { timestamps: true }
));

// ── User ──────────────────────────────────────────────────────────────────────
app.get('/api/user/profile', async (req, res) => {
  try {
    let user = await User.findOne();
    if (!user) user = await User.create({ name: 'David', role: 'Senior Architect', location: 'Berlin, DE' });
    res.json(user);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.put('/api/user/profile', async (req, res) => {
  try {
    let user = await User.findOne();
    if (!user) user = await User.create(req.body);
    else { Object.assign(user, req.body); await user.save(); }
    res.json(user);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── Dashboard ─────────────────────────────────────────────────────────────────
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const taskCount = await Task.countDocuments({ status: { $ne: 'Erledigt' } });
    const logs = await TimeLog.find();
    const totalHours = logs.reduce((acc, l) => acc + (parseFloat(String(l.hours).replace(',', '.')) || 0), 0);
    res.json({ projects: projectCount || 0, tasks: taskCount || 0, hours: totalHours.toFixed(1) });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── Activities ────────────────────────────────────────────────────────────────
app.get('/api/activities', async (req, res) => {
  try {
    let news = await Announcement.find().sort({ createdAt: -1 });
    if (!news.length) {
      news = await Announcement.insertMany([
        { tag: 'Sicherheit', title: 'Neue Sicherheitsrichtlinien für Baustellenbesuche', date: 'Vor 2 Stunden', excerpt: 'Ab sofort gelten erweiterte Sicherheitsvorkehrungen für alle Mitarbeiter auf Baustellen.', variant: 'danger' },
        { tag: 'Unternehmen', title: 'Quartalsergebnisse Q1 und Ausblick', date: 'Heute', excerpt: 'Die DLC Bau Gruppe verzeichnet ein starkes erstes Quartal mit deutlichem Wachstum.', variant: 'success' },
      ]);
    }
    res.json(news);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── Projects ──────────────────────────────────────────────────────────────────
app.get('/api/projects', async (req, res) => {
  try {
    let projects = await Project.find().sort({ createdAt: -1 });
    if (!projects.length) {
      projects = await Project.insertMany([
        { name: 'Neubau Wohnpark Süd', client: 'Müller GmbH', status: 'Aktiv', phase: 'LPH 8', progress: 72, teamSize: 4, hours: 320 },
        { name: 'Sanierung Altbau West', client: 'Stadt Berlin', status: 'Aktiv', phase: 'LPH 5', progress: 45, teamSize: 3, hours: 185 },
        { name: 'Infrastruktur Projekt B', client: 'Becker AG', status: 'Planung', phase: 'LPH 2', progress: 15, teamSize: 2, hours: 40 },
      ]);
    }
    res.json(projects);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── Time Logs ─────────────────────────────────────────────────────────────────
app.get('/api/time-logs', async (req, res) => {
  try { res.json(await TimeLog.find().sort({ createdAt: -1 })); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

app.post('/api/time-logs', async (req, res) => {
  try {
    const { date, jobName, hours, description } = req.body;
    if (!date || !jobName || !hours || !description)
      return res.status(400).json({ message: 'All fields required' });
    res.status(201).json(await TimeLog.create({ date, jobName, hours, description }));
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── Tasks ─────────────────────────────────────────────────────────────────────
app.get('/api/tasks', async (req, res) => {
  try { res.json(await Task.find().sort({ createdAt: -1 })); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── Calendar / Events ─────────────────────────────────────────────────────────
app.get('/api/events', async (req, res) => {
  try { res.json(await Event.find().sort({ date: 1 })); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

app.post('/api/events', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── Team ──────────────────────────────────────────────────────────────────────
app.get('/api/team', async (req, res) => {
  try {
    let members = await TeamMember.find().sort({ createdAt: -1 });
    if (!members.length) {
      members = await TeamMember.insertMany([
        { name: 'David Müller', role: 'Senior Architect', email: 'david@dlcbau.de', department: 'Projektleitung', location: 'Berlin', status: 'Aktiv' },
        { name: 'Anna Schmidt', role: 'Bauleiterin', email: 'anna@dlcbau.de', department: 'Bauleitung', location: 'Berlin', status: 'Aktiv' },
        { name: 'Max Weber', role: 'Technischer Assistent', email: 'max@dlcbau.de', department: 'Technik', location: 'Hamburg', status: 'Aktiv' },
      ]);
    }
    res.json(members);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.post('/api/team', async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json(member);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.delete('/api/team/:id', async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── Tickets ───────────────────────────────────────────────────────────────────
app.get('/api/tickets', async (req, res) => {
  try { res.json(await Ticket.find().sort({ createdAt: -1 })); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

app.post('/api/tickets', async (req, res) => {
  try { res.status(201).json(await Ticket.create(req.body)); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

app.put('/api/tickets/:id', async (req, res) => {
  try { res.json(await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

app.delete('/api/tickets/:id', async (req, res) => {
  try { await Ticket.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

// ── Reports ───────────────────────────────────────────────────────────────────
app.get('/api/reports', async (req, res) => {
  try {
    const [projects, tasks, logs, team] = await Promise.all([
      Project.find(), Task.find(), TimeLog.find(), TeamMember.find()
    ]);
    const totalHours = logs.reduce((acc, l) => acc + (parseFloat(String(l.hours).replace(',', '.')) || 0), 0);
    const byProject = {};
    logs.forEach(l => { byProject[l.jobName] = (byProject[l.jobName] || 0) + (parseFloat(String(l.hours).replace(',', '.')) || 0); });
    res.json({
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'Aktiv').length,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'Erledigt').length,
      totalHours: totalHours.toFixed(1),
      teamSize: team.length,
      hoursByProject: byProject,
    });
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

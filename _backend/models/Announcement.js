const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true }, // "Vor 2 Stunden"
  excerpt: { type: String, required: true },
  variant: { type: String, default: 'primary' }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);

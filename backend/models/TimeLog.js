const mongoose = require('mongoose');

const timeLogSchema = mongoose.Schema({
  date: { type: String, required: true }, // Keeping as string to match frontend "Heute, 15. Mai" or ISO
  jobName: { type: String, required: true },
  hours: { type: String, required: true }, // String to match "8,0"
  status: { type: String, default: 'Ausstehend' },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('TimeLog', timeLogSchema);

const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  
  // NEW FIELDS ADDED HERE:
  workMode: { type: String, required: true, default: 'Remote' }, // Remote, Hybrid, On-site
  employmentType: { type: String, required: true, default: 'Full-Time' }, // Full-Time, Part-Time, Internship, Contract
  
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', JobSchema);
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import our database models
const Job = require('./models/Job');
const Application = require('./models/Application');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Database!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ==========================================
// API ROUTES
// ==========================================

// 1. POST /api/jobs -> Admin posts a new job
app.post('/api/jobs', async (req, res) => {
  try {
    // UPDATED: Added workMode and employmentType
    const { title, description, location, workMode, employmentType } = req.body;

    const newJob = new Job({ 
      title, 
      description, 
      location,
      workMode,
      employmentType
    });

    await newJob.save();

    res.status(201).json({ message: 'Job posted successfully!', job: newJob });
  } catch (error) {
    res.status(500).json({ error: 'Failed to post job' });
  }
});

// 2. GET /api/jobs -> Fetch all jobs for the board
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// 3. POST /api/apply -> Candidate applies for a job
app.post('/api/apply', async (req, res) => {
  try {
    const { jobId, candidateName, candidateEmail, resumeLink, linkedInProfile, coverLetter } = req.body;

    const newApplication = new Application({ 
      jobId, 
      candidateName, 
      candidateEmail, 
      resumeLink,
      linkedInProfile, 
      coverLetter 
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully!' });

  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// 4. GET /api/applications -> Admin fetches all candidate applications
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('jobId', 'title')
      .sort({ appliedAt: -1 });

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// 5. DELETE /api/jobs/:id -> Admin deletes a job
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// 6. PUT /api/jobs/:id -> Admin edits a job
app.put('/api/jobs/:id', async (req, res) => {
  try {
    // UPDATED: Added workMode and employmentType
    const { title, description, location, workMode, employmentType } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id, 
      { 
        title, 
        description, 
        location,
        workMode,
        employmentType
      }, 
      { new: true }
    );

    res.status(200).json({ message: 'Job updated successfully', job: updatedJob });

  } catch (error) {
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// Basic Test Route
app.get('/', (req, res) => {
  res.send('Unizoy Backend is running smoothly!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
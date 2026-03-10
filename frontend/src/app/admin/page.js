'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { 
  Building2, Briefcase, MapPin, FileText, CheckCircle2, 
  AlertCircle, ArrowLeft, Users, ExternalLink, PlusCircle, 
  Calendar, Send, Lock, KeyRound, Linkedin, Trash2, Edit2, List,
  Globe, Clock // NEW: Imported icons for the new dropdowns
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState('post'); // 'post', 'applications', 'manage'
  
  // NEW: Added default states for workMode and employmentType
  const [formData, setFormData] = useState({ 
    title: '', description: '', location: '', workMode: 'Remote', employmentType: 'Full-Time' 
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);

  // State for managing jobs
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'unizoy123') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setPasscode('');
    }
  };

  // Fetch Applications
  useEffect(() => {
    if (isAuthenticated && activeTab === 'applications') {
      const fetchApps = async () => {
        setLoadingApps(true);
        try {
          const res = await axios.get('http://localhost:5000/api/applications');
          setApplications(res.data);
        } catch (error) {
          console.error('Error fetching applications', error);
        } finally {
          setLoadingApps(false);
        }
      };
      fetchApps();
    }
  }, [isAuthenticated, activeTab]);

  // Fetch Jobs for Management Tab
  useEffect(() => {
    if (isAuthenticated && activeTab === 'manage') {
      fetchJobs();
    }
  }, [isAuthenticated, activeTab]);

  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      await axios.post('http://localhost:5000/api/jobs', formData);
      setStatus({ type: 'success', message: 'Job published successfully to the live board!' });
      // NEW: Reset form with the new fields
      setFormData({ title: '', description: '', location: '', workMode: 'Remote', employmentType: 'Full-Time' }); 
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to post job. Check server connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Job
  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job? It will be removed from the live site.')) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      alert('Failed to delete job');
    }
  };

  // Handle Update Job
  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/jobs/${editingJob._id}`, editingJob);
      setEditingJob(null);
      fetchJobs(); // Refresh the list
    } catch (error) {
      alert('Failed to update job');
    }
  };

  // ==========================================
  // LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-transparent relative z-10 font-sans">
        <div className="max-w-md w-full bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 md:p-12 text-center flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full border border-blue-100 mb-6 bg-transparent text-blue-600">
            <Lock size={28} />
          </div>
          <h1 className="text-4xl font-bold text-[#0f172a] mb-3 tracking-tight" style={{fontFamily: 'Georgia, serif'}}>Admin Access</h1>
          <p className="text-gray-500 font-medium mb-8 text-lg">Please enter your secure passcode to access the workspace.</p>
          <form onSubmit={handleLogin} className="space-y-6 w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyRound size={20} className="text-gray-400" />
              </div>
              <input 
                type="password" required
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] transition-all outline-none font-bold text-gray-900 tracking-[0.2em] text-center"
                placeholder="••••••••" value={passcode} onChange={(e) => setPasscode(e.target.value)}
              />
            </div>
            {loginError && <p className="text-red-500 text-sm font-bold">Incorrect passcode. Try again.</p>}
            <button type="submit" className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98]">
              Unlock Dashboard
            </button>
          </form>
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#0f172a] transition-colors mt-8 font-semibold">
            &larr; Return to Public Site
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN ADMIN DASHBOARD 
  // ==========================================
  return (
    <div className="min-h-screen bg-transparent relative font-sans flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <div className="w-full md:w-80 bg-white border-r border-gray-200 p-8 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <div className="flex -space-x-1">
              <div className="w-3.5 h-8 border-2 border-[#0f172a] rounded-full"></div>
              <div className="w-3.5 h-8 border-2 border-[#0f172a] rounded-full mt-2.5"></div>
              <div className="w-3.5 h-8 border-2 border-[#0f172a] rounded-full"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#0f172a] ml-2">Unizoy <span className="font-normal text-gray-600">Admin</span></span>
          </div>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('post')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'post' ? 'bg-gray-100 text-[#0f172a]' : 'text-gray-500 hover:bg-gray-50 hover:text-[#0f172a]'}`}>
              <PlusCircle size={20} /> Post a Job
            </button>
            <button onClick={() => setActiveTab('manage')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'manage' ? 'bg-gray-100 text-[#0f172a]' : 'text-gray-500 hover:bg-gray-50 hover:text-[#0f172a]'}`}>
              <List size={20} /> Manage Jobs
            </button>
            <button onClick={() => setActiveTab('applications')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'applications' ? 'bg-gray-100 text-[#0f172a]' : 'text-gray-500 hover:bg-gray-50 hover:text-[#0f172a]'}`}>
              <Users size={20} /> View Candidates
            </button>
          </nav>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0f172a] transition-colors mt-12 font-semibold">
          <ArrowLeft size={18} /> Live Website
        </Link>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-8 md:p-12 relative z-10 h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* POST JOB TAB */}
          {activeTab === 'post' && (
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-10 max-w-2xl mx-auto">
              <div className="mb-8 border-b border-gray-100 pb-6">
                <h1 className="text-3xl font-bold text-[#0f172a]" style={{fontFamily: 'Georgia, serif'}}>Create Position</h1>
                <p className="text-gray-500 font-medium mt-2">Publish a new role to your public career page.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#0f172a] mb-2">Job Title</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Briefcase size={20} className="text-gray-400" /></div>
                    <input type="text" required className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] outline-none font-medium text-gray-900" placeholder="e.g. Senior Frontend Engineer" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                  </div>
                </div>
                
                {/* NEW: Replaced single Location input with a Grid containing Location, Work Mode, and Employment Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0f172a] mb-2">Location</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><MapPin size={20} className="text-gray-400" /></div>
                      <input type="text" required className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] outline-none font-medium text-gray-900" placeholder="e.g. Remote, India" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0f172a] mb-2">Work Mode</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Globe size={20} className="text-gray-400" /></div>
                      <select required className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] outline-none font-medium text-gray-900 appearance-none" value={formData.workMode} onChange={(e) => setFormData({...formData, workMode: e.target.value})}>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-[#0f172a] mb-2">Employment Type</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Clock size={20} className="text-gray-400" /></div>
                      <select required className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] outline-none font-medium text-gray-900 appearance-none" value={formData.employmentType} onChange={(e) => setFormData({...formData, employmentType: e.target.value})}>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0f172a] mb-2">Description</label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none"><FileText size={20} className="text-gray-400" /></div>
                    <textarea required rows="5" className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] outline-none font-medium text-gray-900 resize-none" placeholder="Detail the responsibilities..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-4 rounded-xl transition-all shadow-md">
                  {isSubmitting ? 'Publishing...' : 'Publish Job'}
                </button>
                {status.message && (
                  <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {status.type === 'success' ? <CheckCircle2 size={20} className="text-green-600"/> : <AlertCircle size={20} className="text-red-600"/>}
                    <span className="font-bold">{status.message}</span>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* MANAGE JOBS TAB */}
          {activeTab === 'manage' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0f172a]" style={{fontFamily: 'Georgia, serif'}}>Manage Jobs</h1>
                <p className="text-gray-500 font-medium mt-2">Edit details or delete open positions from the live site.</p>
              </div>

              {loadingJobs ? (
                <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0f172a]"></div></div>
              ) : editingJob ? (
                // EDIT JOB FORM
                <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8">
                  <h3 className="text-xl font-bold text-[#0f172a] mb-6">Editing: {editingJob.title}</h3>
                  <form onSubmit={handleUpdateJob} className="space-y-4">
                    <input 
                      type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium" 
                      value={editingJob.title} onChange={(e) => setEditingJob({...editingJob, title: e.target.value})} 
                    />
                    
                    {/* NEW: Edit form grid with Location, Work Mode, and Employment Type */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input 
                        type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium" 
                        value={editingJob.location} onChange={(e) => setEditingJob({...editingJob, location: e.target.value})} 
                      />
                      <select 
                        required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium appearance-none" 
                        value={editingJob.workMode || 'Remote'} onChange={(e) => setEditingJob({...editingJob, workMode: e.target.value})}
                      >
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                      </select>
                      <select 
                        required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium appearance-none" 
                        value={editingJob.employmentType || 'Full-Time'} onChange={(e) => setEditingJob({...editingJob, employmentType: e.target.value})}
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    <textarea 
                      required rows="5" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium resize-none" 
                      value={editingJob.description} onChange={(e) => setEditingJob({...editingJob, description: e.target.value})} 
                    />
                    <div className="flex gap-3 pt-4">
                      <button type="submit" className="flex-1 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-3 rounded-xl transition-all">Save Changes</button>
                      <button type="button" onClick={() => setEditingJob(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#0f172a] font-bold py-3 rounded-xl transition-all">Cancel</button>
                    </div>
                  </form>
                </div>
              ) : jobs.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-[32px] p-12 text-center shadow-sm">
                  <Briefcase size={32} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-[#0f172a]">No jobs posted yet</h3>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job._id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#0f172a]">{job.title}</h3>
                        
                        {/* NEW: Displays Location + The New Tags nicely underneath the title */}
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          <span className="text-gray-500 font-semibold flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold text-xs">{job.workMode || 'Remote'}</span>
                          <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold text-xs">{job.employmentType || 'Full-Time'}</span>
                        </div>

                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button onClick={() => setEditingJob(job)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#0f172a] font-bold rounded-xl transition-colors">
                          <Edit2 size={16} /> Edit
                        </button>
                        <button onClick={() => handleDeleteJob(job._id)} className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors">
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW CANDIDATES TAB (Kept exactly as it was) */}
          {activeTab === 'applications' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0f172a]" style={{fontFamily: 'Georgia, serif'}}>Candidate Pipeline</h1>
                <p className="text-gray-500 font-medium mt-2">Review applications and reply to candidates directly.</p>
              </div>
              {loadingApps ? (
                <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0f172a]"></div></div>
              ) : applications.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-[32px] p-12 text-center shadow-sm">
                  <Users size={32} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-[#0f172a]">No candidates yet</h3>
                  <p className="text-gray-500 font-medium">When someone applies, they will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app._id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#0f172a]">{app.candidateName}</h3>
                          <p className="text-gray-500 font-semibold mt-1">{app.candidateEmail}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-[#0f172a] font-bold">
                              Job: {app.jobId ? app.jobId.title : 'Deleted Job'}
                            </span>
                            <span className="flex items-center gap-1 font-medium"><Calendar size={14} /> {new Date(app.appliedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 shrink-0 mt-4 md:mt-0">
                          <a href={`mailto:${app.candidateEmail}`} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#0f172a] font-bold rounded-xl transition-colors">
                            <Send size={16} /> Reply
                          </a>
                          {app.linkedInProfile && (
                            <a href={app.linkedInProfile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-[#0077b5] hover:bg-[#005582] text-white font-bold rounded-xl transition-colors shadow-md">
                              <Linkedin size={16} /> LinkedIn
                            </a>
                          )}
                          <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-colors shadow-md">
                            Resume <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                      {app.coverLetter && (
                        <div className="mt-2 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                          <div className="flex items-center gap-2 text-[#0f172a] font-bold mb-2">
                            <FileText size={16} /> Cover Letter
                          </div>
                          <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                            {app.coverLetter}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { MapPin, Calendar, Search, ArrowRight, Sparkles, Briefcase, Clock } from 'lucide-react';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://unizoy-job-board.onrender.com/api/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent font-sans text-gray-900 relative flex flex-col">
      
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            <div className="w-3.5 h-8 border-2 border-[#0f172a] rounded-full"></div>
            <div className="w-3.5 h-8 border-2 border-[#0f172a] rounded-full mt-2.5"></div>
            <div className="w-3.5 h-8 border-2 border-[#0f172a] rounded-full"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#0f172a] ml-2">Unizoy <span className="font-normal text-gray-600">Careers</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-[#0f172a]">
          <span className="border-b-2 border-[#0f172a] pb-1 cursor-pointer">Open Roles</span>
          <Link href="/admin" className="hover:text-blue-600 cursor-pointer transition-colors">
             Admin Portal
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-20 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/40 border border-[#e8d5c4] text-[#0f172a] text-sm font-semibold mb-8 backdrop-blur-sm shadow-sm">
          <Sparkles size={16} />
          <span>Join our growing team</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-[#0f172a]" style={{fontFamily: 'Georgia, serif'}}>
          Build the future with <span className="font-bold">Unizoy</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl font-medium leading-relaxed">
          We are looking for passionate individuals to join us in creating world-class digital experiences. Find your next dream role below.
        </p>
      </div>

      {/* Job Board Section */}
      <div className="max-w-4xl mx-auto px-6 py-10 relative z-10 flex-grow w-full">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <Briefcase className="text-[#0f172a]" size={28} />
            <h2 className="text-3xl font-bold text-[#0f172a]">Open Positions</h2>
          </div>
          
          <div className="relative w-full md:w-80 shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="w-full pl-12 pr-4 py-3 bg-white/60 border border-[#e8d5c4] rounded-2xl focus:ring-2 focus:ring-[#0f172a] outline-none transition-all font-medium text-gray-900 backdrop-blur-md"
              placeholder="Search title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f172a]"></div></div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-[#f4e6d8] rounded-3xl p-12 text-center border border-[#e8d5c4]">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">We couldn't find any positions matching your search.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div 
                key={job._id} 
                className="bg-[#f4e4d4] rounded-[32px] p-8 border border-[#e8d5c4] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative hover:shadow-md transition-shadow"
                style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(160, 100, 40, 0.015) 1px, rgba(160, 100, 40, 0.015) 2px)'}}
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-[#0f172a]">{job.title}</h3>
                    
                    {/* FIXED: Dynamically rendering job employment type (e.g., Contract, Full-Time) */}
                    {job.employmentType && (
                      <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-[#0f172a] border border-[#e8d5c4] flex items-center gap-1">
                        <Clock size={12} /> {job.employmentType}
                      </span>
                    )}

                    {/* Dynamically rendering work mode (e.g., Remote, On-site) if it exists */}
                    {job.workMode && (
                      <span className="px-3 py-1 bg-blue-100/50 rounded-full text-xs font-bold text-blue-800 border border-blue-200 flex items-center gap-1">
                        <MapPin size={12} /> {job.workMode}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6 max-w-xl font-medium">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-600">
                    <div className="flex items-center gap-1.5 bg-white/50 px-4 py-2 rounded-xl border border-[#e8d5c4]">
                      <MapPin size={16} /> {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/50 px-4 py-2 rounded-xl border border-[#e8d5c4]">
                      <Calendar size={16} /> Posted {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <Link 
                  href={`/apply/${job._id}`} 
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold py-3 px-8 rounded-2xl transition-all shadow-md shrink-0"
                >
                  Apply Now <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COMPULSORY PROFESSIONAL FOOTER */}
      <footer className="w-full border-t border-[#e8d5c4] mt-20 bg-[#fdf2e8]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1 opacity-50">
              <div className="w-2.5 h-6 border-2 border-[#0f172a] rounded-full"></div>
              <div className="w-2.5 h-6 border-2 border-[#0f172a] rounded-full mt-2"></div>
              <div className="w-2.5 h-6 border-2 border-[#0f172a] rounded-full"></div>
            </div>
            <span className="text-lg font-bold text-[#0f172a] opacity-50 ml-2">Unizoy</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-gray-500">
            <span className="hover:text-[#0f172a] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#0f172a] cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-[#0f172a] cursor-pointer transition-colors">Cookie Settings</span>
          </div>

          <p className="text-sm font-medium text-gray-500">
            &copy; {new Date().getFullYear()} Unizoy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
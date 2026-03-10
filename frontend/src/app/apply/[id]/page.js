'use client';

import { useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Mail, Link as LinkIcon, Send, CheckCircle2, AlertCircle, Linkedin, FileText } from 'lucide-react';

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id;

  // Added LinkedIn, Cover Letter, and Checkbox state
  const [formData, setFormData] = useState({ 
    candidateName: '', 
    candidateEmail: '', 
    resumeLink: '',
    linkedInProfile: '',
    coverLetter: ''
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setStatus({ type: 'error', message: 'You must agree to the Terms of Service to apply.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post('http://localhost:5000/api/apply', { jobId, ...formData });
      setStatus({ type: 'success', message: 'Application submitted! Redirecting...' });
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit application. Please try again.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 py-16 font-sans relative z-10">
      <div className="w-full max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0f172a] transition-colors mb-6 font-semibold">
          <ArrowLeft size={18} /> Back to Open Positions
        </Link>

        {/* Clean White Card */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 md:p-12">
          
          <div className="mb-8 text-center flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border border-blue-100 mb-6 bg-transparent text-blue-600">
              <Send size={28} className="ml-1" />
            </div>
            
            <h1 className="text-4xl font-bold text-[#0f172a] tracking-tight mb-2" style={{fontFamily: 'Georgia, serif'}}>
              Submit Application
            </h1>
            <p className="text-gray-500 font-medium text-lg">You are one step closer to joining Unizoy.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Split Row for Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#0f172a] mb-2">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User size={20} className="text-gray-400" /></div>
                  <input type="text" required className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] transition-all outline-none font-medium text-gray-900" placeholder="Deepak Yadav" value={formData.candidateName} onChange={(e) => setFormData({...formData, candidateName: e.target.value})} disabled={status.type === 'success'} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0f172a] mb-2">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail size={20} className="text-gray-400" /></div>
                  <input type="email" required className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] transition-all outline-none font-medium text-gray-900" placeholder="dy0169489@gmail.com" value={formData.candidateEmail} onChange={(e) => setFormData({...formData, candidateEmail: e.target.value})} disabled={status.type === 'success'} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0f172a] mb-2">Resume / Portfolio Link <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><LinkIcon size={20} className="text-gray-400" /></div>
                <input type="url" required className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] transition-all outline-none font-medium text-gray-900" placeholder="https://d0027.github.io/my-portfolio/" value={formData.resumeLink} onChange={(e) => setFormData({...formData, resumeLink: e.target.value})} disabled={status.type === 'success'} />
              </div>
            </div>

            {/* NEW: LinkedIn Field */}
            <div>
              <label className="block text-sm font-bold text-[#0f172a] mb-2">LinkedIn Profile <span className="text-gray-400 font-medium">(Optional)</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Linkedin size={20} className="text-gray-400" /></div>
                <input type="url" className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] transition-all outline-none font-medium text-gray-900" placeholder="https://linkedin.com/in/deepakyadav027" value={formData.linkedInProfile} onChange={(e) => setFormData({...formData, linkedInProfile: e.target.value})} disabled={status.type === 'success'} />
              </div>
            </div>

            {/* NEW: Cover Letter Field */}
            <div>
              <label className="block text-sm font-bold text-[#0f172a] mb-2">Cover Letter <span className="text-gray-400 font-medium">(Optional)</span></label>
              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none"><FileText size={20} className="text-gray-400" /></div>
                <textarea rows="4" className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] transition-all outline-none font-medium text-gray-900 resize-none" placeholder="Tell us why you're a great fit for Unizoy..." value={formData.coverLetter} onChange={(e) => setFormData({...formData, coverLetter: e.target.value})} disabled={status.type === 'success'} />
              </div>
            </div>

            {/* NEW: Compulsory Privacy Checkbox */}
            <div className="flex items-start gap-3 bg-gray-50/50 p-4 rounded-xl border border-gray-200">
              <input 
                type="checkbox" 
                id="terms"
                required
                className="mt-1 w-5 h-5 rounded border-gray-300 text-[#0f172a] focus:ring-[#0f172a] cursor-pointer"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                disabled={status.type === 'success'}
              />
              <label htmlFor="terms" className="text-sm font-medium text-gray-600 cursor-pointer">
                I agree to the Unizoy <span className="text-[#0f172a] font-bold underline">Privacy Policy</span> and consent to the processing of my personal data for recruitment purposes.
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting || status.type === 'success'} className={`w-full font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 ${status.type === 'success' ? 'bg-green-600 text-white' : 'bg-[#0f172a] hover:bg-[#1e293b] text-white'}`}>
              {isSubmitting && status.type !== 'success' ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> : status.type === 'success' ? <><CheckCircle2 size={22} /> Application Sent Successfully!</> : 'Submit Application'}
            </button>
            
            {status.type === 'error' && <div className="mt-4 p-4 rounded-xl bg-red-50 text-red-800 border border-red-200 flex items-center gap-3"><AlertCircle size={20}/><span className="font-bold">{status.message}</span></div>}
          </form>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { admissionsAPI } from '../services/api';
import GlassCard from '../components/GlassCard';
import { Send, CheckCircle, Info, Calendar } from 'lucide-react';

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    grade: 'Nursery',
    additionalInfo: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    if (!formData.studentName || !formData.parentName || !formData.email || !formData.phone) {
      setStatus({ type: 'error', message: 'All mandatory fields must be completed.' });
      setLoading(false);
      return;
    }

    try {
      const response = await admissionsAPI.submit(formData);
      setStatus({ 
        type: 'success', 
        message: response.message || 'Application submitted successfully! Our admissions office will get in touch shortly.' 
      });
      // Clear form
      setFormData({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        grade: 'Nursery',
        additionalInfo: '',
      });
    } catch (err) {
      console.error(err);
      setStatus({ 
        type: 'error', 
        message: err.message || 'Failed to submit application. Please check your network and try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Admissions <span className="gold-gradient">Portal</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light text-sm sm:text-base">
          Join our learning community. Submit an online admission inquiry form below to initiate the enrollment process.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <GlassCard className="space-y-6" hoverEffect={false}>
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Info className="h-6 w-6 text-brand-gold-500" />
              <span>Enrollment Steps</span>
            </h2>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="bg-brand-red-950 text-brand-gold-500 rounded-full h-7 w-7 flex-shrink-0 flex items-center justify-center font-bold text-xs border border-brand-red-900/40">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Form Submission</h4>
                  <p className="text-xs text-gray-400 font-light mt-1">Submit the online inquiry on the right with details of the prospective student.</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="bg-brand-red-950 text-brand-gold-500 rounded-full h-7 w-7 flex-shrink-0 flex items-center justify-center font-bold text-xs border border-brand-red-900/40">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Interaction & Evaluation</h4>
                  <p className="text-xs text-gray-400 font-light mt-1">Our administrative staff will invite the child and parents for an informal dialogue.</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="bg-brand-red-950 text-brand-gold-500 rounded-full h-7 w-7 flex-shrink-0 flex items-center justify-center font-bold text-xs border border-brand-red-900/40">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Document Verification</h4>
                  <p className="text-xs text-gray-400 font-light mt-1">Submission of transcripts, proof of birth, and character certificates.</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="bg-brand-red-950 text-brand-gold-500 rounded-full h-7 w-7 flex-shrink-0 flex items-center justify-center font-bold text-xs border border-brand-red-900/40">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Fee & Enrollment</h4>
                  <p className="text-xs text-gray-400 font-light mt-1">Payment of term fees to secure the student seat and finalize registration.</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={false}>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Calendar className="h-5.5 w-5.5 text-brand-gold-500" />
              <span>Admissions Timeline</span>
            </h2>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Application Window Opens:</span>
                <span className="text-white font-semibold">August 1st</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Primary School Interactions:</span>
                <span className="text-white font-semibold">September - October</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Senior Merit Assessments:</span>
                <span className="text-white font-semibold">November 15th</span>
              </li>
              <li className="flex justify-between">
                <span>Class Commences:</span>
                <span className="text-white font-semibold">April 2027</span>
              </li>
            </ul>
          </GlassCard>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <GlassCard hoverEffect={false}>
            <h2 className="text-2xl font-bold text-white mb-6">Online Registration Inquiry</h2>
            
            {status.message && (
              <div className={`p-4 rounded-lg mb-6 flex items-start space-x-3 border ${
                status.type === 'success' 
                  ? 'bg-green-950/30 text-green-400 border-green-500/20' 
                  : 'bg-red-950/30 text-red-400 border-red-500/20'
              }`}>
                {status.type === 'success' && <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />}
                <p className="text-sm font-medium">{status.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Student Full Name <span className="text-brand-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="glass-input"
                    placeholder="e.g. Vihaan Sharma"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Parent / Guardian Name <span className="text-brand-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className="glass-input"
                    placeholder="e.g. Alok Sharma"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email Address <span className="text-brand-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="glass-input"
                    placeholder="parent@example.com"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Mobile Number <span className="text-brand-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="glass-input"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Grade Seeking Admission To <span className="text-brand-red-500">*</span>
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="glass-input bg-brand-dark"
                >
                  <option value="Nursery">Nursery</option>
                  <option value="Kindergarten">Kindergarten</option>
                  <option value="Grade I">Grade I</option>
                  <option value="Grade V">Grade V</option>
                  <option value="Grade VI">Grade VI</option>
                  <option value="Grade IX">Grade IX</option>
                  <option value="Grade XI (Science)">Grade XI (Science)</option>
                  <option value="Grade XI (Humanities)">Grade XI (Humanities)</option>
                  <option value="Grade XI (Commerce)">Grade XI (Commerce)</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Additional Information / Requirements
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="4"
                  className="glass-input resize-none"
                  placeholder="Tell us about the child's academic background, achievements, hobbies, or reasons for joining."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-red-600 to-brand-red-800 hover:from-brand-red-500 hover:to-brand-red-700 text-white font-bold py-3.5 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-red-950/60 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-r-2 border-transparent"></div>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Admissions;

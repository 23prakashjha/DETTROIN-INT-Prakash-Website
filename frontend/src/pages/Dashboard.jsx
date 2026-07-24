import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { noticesAPI, admissionsAPI, gradesAPI } from '../services/api';
import GlassCard from '../components/GlassCard';
import { Plus, Trash2, Check, X, Megaphone, PlusCircle, CheckSquare, Clipboard, Users, FileSpreadsheet } from 'lucide-react';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  
  // States
  const [notices, setNotices] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Forms
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    content: '',
    category: 'General',
    priority: 'medium'
  });

  const [gradeForm, setGradeForm] = useState({
    studentEmail: '',
    studentName: '',
    subject: 'Mathematics',
    marks: '',
    maxMarks: 100,
    grade: 'A',
    remarks: '',
    term: 'Term 1'
  });

  // Action states
  const [submittingNotice, setSubmittingNotice] = useState(false);
  const [submittingGrade, setSubmittingGrade] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/portal');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Run parallel queries depending on role
        if (user.role === 'admin') {
          const [noticesData, admissionsData, gradesData] = await Promise.all([
            noticesAPI.getAll(),
            admissionsAPI.getAll(),
            gradesAPI.getAll()
          ]);
          setNotices(noticesData);
          setAdmissions(admissionsData);
          setGrades(gradesData);
        } else if (user.role === 'teacher') {
          const [noticesData, admissionsData, gradesData] = await Promise.all([
            noticesAPI.getAll(),
            admissionsAPI.getAll(),
            gradesAPI.getAll()
          ]);
          setNotices(noticesData);
          setAdmissions(admissionsData);
          setGrades(gradesData);
        } else if (user.role === 'student') {
          const [noticesData, gradesData] = await Promise.all([
            noticesAPI.getAll(),
            gradesAPI.getAll()
          ]);
          setNotices(noticesData);
          setGrades(gradesData);
        }
      } catch (err) {
        console.error('Dashboard load error:', err);
        setError('Failed to query dashboard database. Please ensure MongoDB is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  // Notice creation
  const handleNoticeChange = (e) => {
    setNoticeForm({ ...noticeForm, [e.target.name]: e.target.value });
  };

  const submitNotice = async (e) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;
    setSubmittingNotice(true);
    try {
      const data = await noticesAPI.create(noticeForm);
      setNotices([data, ...notices]);
      setNoticeForm({ title: '', content: '', category: 'General', priority: 'medium' });
    } catch (err) {
      console.error(err);
      alert('Error creating notice: ' + err.message);
    } finally {
      setSubmittingNotice(false);
    }
  };

  const deleteNotice = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await noticesAPI.delete(id);
      setNotices(notices.filter(n => n._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete notice.');
    }
  };

  // Grade creation
  const handleGradeChange = (e) => {
    setGradeForm({ ...gradeForm, [e.target.name]: e.target.value });
  };

  const submitGrade = async (e) => {
    e.preventDefault();
    if (!gradeForm.studentEmail || !gradeForm.studentName || !gradeForm.marks) return;
    setSubmittingGrade(true);
    try {
      const data = await gradesAPI.create(gradeForm);
      setGrades([data, ...grades]);
      setGradeForm({
        studentEmail: '',
        studentName: '',
        subject: 'Mathematics',
        marks: '',
        maxMarks: 100,
        grade: 'A',
        remarks: '',
        term: 'Term 1'
      });
    } catch (err) {
      console.error(err);
      alert('Error adding grade record: ' + err.message);
    } finally {
      setSubmittingGrade(false);
    }
  };

  const deleteGrade = async (id) => {
    if (!window.confirm('Remove this grade record?')) return;
    try {
      await gradesAPI.delete(id);
      setGrades(grades.filter(g => g._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete grade record.');
    }
  };

  // Admission status update
  const updateAdmissionStatus = async (id, status) => {
    try {
      const data = await admissionsAPI.updateStatus(id, status);
      setAdmissions(admissions.map(a => a._id === id ? data.application : a));
    } catch (err) {
      console.error(err);
      alert('Failed to update admission status.');
    }
  };

  if (!user) return null;

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Welcome Banner */}
      <GlassCard className="relative overflow-hidden p-8 border-brand-red-900/30 bg-gradient-to-r from-brand-dark to-brand-red-950/20" hoverEffect={false}>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">{user.role} Dashboard</span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Welcome back, {user.name}</h1>
            <p className="text-sm text-gray-400 font-light mt-1">Accessing Vasant Valley portal services.</p>
          </div>
          <div className="bg-brand-red-950/80 border border-brand-red-900/50 rounded-lg px-4 py-2 text-xs text-gray-300">
            <strong>Logged in as:</strong> {user.email}
          </div>
        </div>
      </GlassCard>

      {/* Database Warning */}
      {error && (
        <div className="p-4 rounded-xl bg-yellow-950/30 border border-yellow-500/20 text-yellow-400 text-sm flex items-start space-x-3">
          <span className="text-lg mt-0.5">⚠️</span>
          <div>
            <h4 className="font-bold">Offline Database Indicator</h4>
            <p className="text-xs font-light mt-1">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-gold-500 border-r-2 border-transparent"></div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* ========================================================================= */}
          {/* STUDENT DASHBOARD VIEW */}
          {/* ========================================================================= */}
          {user.role === 'student' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Grades / Report Card */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="h-5.5 w-5.5 text-brand-gold-500" />
                  <h2 className="text-2xl font-bold">Academic Transcript</h2>
                </div>
                <GlassCard hoverEffect={false}>
                  {grades.length === 0 ? (
                    <p className="text-sm text-gray-400 py-6 text-center font-light">No grade cards published for this term yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-white/10 text-gray-400 font-medium">
                            <th className="pb-3">Subject</th>
                            <th className="pb-3">Term</th>
                            <th className="pb-3 text-center">Score</th>
                            <th className="pb-3 text-center">Grade</th>
                            <th className="pb-3 hidden sm:table-cell">Faculty Feedback</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {grades.map((g) => (
                            <tr key={g._id} className="text-gray-300">
                              <td className="py-3 font-semibold text-white">{g.subject}</td>
                              <td className="py-3 text-xs">{g.term}</td>
                              <td className="py-3 text-center">{g.marks} / {g.maxMarks}</td>
                              <td className="py-3 text-center font-bold text-brand-gold-500">{g.grade}</td>
                              <td className="py-3 text-xs text-gray-400 italic hidden sm:table-cell">{g.remarks || 'No remarks.'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </GlassCard>
              </div>

              {/* General notices board */}
              <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center space-x-2">
                  <Megaphone className="h-5.5 w-5.5 text-brand-gold-500" />
                  <h2 className="text-2xl font-bold">Notice Board</h2>
                </div>
                <div className="space-y-4">
                  {notices.slice(0, 3).map((n) => (
                    <GlassCard key={n._id} className="p-5" hoverEffect={false}>
                      <span className="text-[9px] uppercase font-bold text-brand-gold-500 bg-brand-red-950 border border-brand-red-900/30 px-2 py-0.5 rounded">
                        {n.category}
                      </span>
                      <h4 className="font-bold text-white text-sm mt-2">{n.title}</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">{n.content}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TEACHER DASHBOARD VIEW */}
          {/* ========================================================================= */}
          {user.role === 'teacher' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Grade publisher & current database grades */}
              <div className="lg:col-span-7 space-y-8">
                {/* Publish Grade Form */}
                <GlassCard hoverEffect={false}>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <PlusCircle className="h-5 w-5 text-brand-gold-500" />
                    <span>Publish Student Grades</span>
                  </h3>
                  <form onSubmit={submitGrade} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Student Email</label>
                        <input
                          type="email"
                          name="studentEmail"
                          value={gradeForm.studentEmail}
                          onChange={handleGradeChange}
                          className="glass-input text-xs"
                          placeholder="student@vasantvalley.edu"
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Student Name</label>
                        <input
                          type="text"
                          name="studentName"
                          value={gradeForm.studentName}
                          onChange={handleGradeChange}
                          className="glass-input text-xs"
                          placeholder="Aarav Mehta"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Subject</label>
                        <select
                          name="subject"
                          value={gradeForm.subject}
                          onChange={handleGradeChange}
                          className="glass-input text-xs bg-brand-dark"
                        >
                          <option value="Mathematics">Mathematics</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Biology">Biology</option>
                          <option value="English Literature">English Literature</option>
                          <option value="Computer Science">Computer Science</option>
                        </select>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Term</label>
                        <select
                          name="term"
                          value={gradeForm.term}
                          onChange={handleGradeChange}
                          className="glass-input text-xs bg-brand-dark"
                        >
                          <option value="Term 1">Term 1</option>
                          <option value="Term 2">Term 2</option>
                          <option value="Final Board Exam">Final Board Exam</option>
                        </select>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Marks & Grade</label>
                        <div className="flex space-x-2">
                          <input
                            type="number"
                            name="marks"
                            value={gradeForm.marks}
                            onChange={handleGradeChange}
                            className="glass-input text-xs flex-1"
                            placeholder="Marks"
                            required
                          />
                          <input
                            type="text"
                            name="grade"
                            value={gradeForm.grade}
                            onChange={handleGradeChange}
                            className="glass-input text-xs w-16 text-center"
                            placeholder="A+"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Faculty Remarks</label>
                      <input
                        type="text"
                        name="remarks"
                        value={gradeForm.remarks}
                        onChange={handleGradeChange}
                        className="glass-input text-xs"
                        placeholder="Excellent analysis, active class participation."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingGrade}
                      className="w-full bg-brand-red-800 hover:bg-brand-red-700 text-white font-bold py-2 px-4 rounded text-xs transition-colors flex justify-center items-center space-x-1 disabled:opacity-50"
                    >
                      <span>Submit Record</span>
                      <Plus className="h-4 w-4" />
                    </button>
                  </form>
                </GlassCard>

                {/* Published grade cards view */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Clipboard className="h-5 w-5 text-brand-gold-500" />
                    <span>Grading History ({grades.length})</span>
                  </h3>
                  <GlassCard hoverEffect={false}>
                    {grades.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-6 font-light">No students graded yet.</p>
                    ) : (
                      <div className="divide-y divide-white/5 max-h-80 overflow-y-auto pr-2">
                        {grades.map((g) => (
                          <div key={g._id} className="py-3 flex justify-between items-center text-xs">
                            <div>
                              <div className="font-semibold text-white">{g.studentName} ({g.studentEmail})</div>
                              <div className="text-gray-400 mt-0.5">{g.subject} • {g.term} • Score: {g.marks}/100</div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-brand-gold-500">{g.grade}</span>
                              <button
                                onClick={() => deleteGrade(g._id)}
                                className="text-red-400 hover:text-red-500 transition-colors p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </div>
              </div>

              {/* Right Column: Faculty notices list & publisher */}
              <div className="lg:col-span-5 space-y-8">
                {/* Publish Notice Form */}
                <GlassCard hoverEffect={false}>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Megaphone className="h-5 w-5 text-brand-gold-500" />
                    <span>Publish Announcement</span>
                  </h3>
                  <form onSubmit={submitNotice} className="space-y-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={noticeForm.title}
                        onChange={handleNoticeChange}
                        className="glass-input text-xs"
                        placeholder="e.g. Science Fair Registration open"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Category</label>
                        <select
                          name="category"
                          value={noticeForm.category}
                          onChange={handleNoticeChange}
                          className="glass-input text-xs bg-brand-dark"
                        >
                          <option value="General">General</option>
                          <option value="Academic">Academic</option>
                          <option value="Event">Event</option>
                          <option value="Sports">Sports</option>
                        </select>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Priority</label>
                        <select
                          name="priority"
                          value={noticeForm.priority}
                          onChange={handleNoticeChange}
                          className="glass-input text-xs bg-brand-dark"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Notice Content</label>
                      <textarea
                        name="content"
                        value={noticeForm.content}
                        onChange={handleNoticeChange}
                        rows="3"
                        className="glass-input text-xs resize-none"
                        placeholder="Full body of notice..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingNotice}
                      className="w-full bg-brand-red-800 hover:bg-brand-red-700 text-white font-bold py-2 px-4 rounded text-xs transition-colors flex justify-center items-center space-x-1 disabled:opacity-50"
                    >
                      <span>Broadcast Notice</span>
                      <Plus className="h-4 w-4" />
                    </button>
                  </form>
                </GlassCard>

                {/* Notices delete list */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Megaphone className="h-5 w-5 text-brand-gold-500" />
                    <span>Manage Notices ({notices.length})</span>
                  </h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {notices.map((n) => (
                      <GlassCard key={n._id} className="p-4 relative" hoverEffect={false}>
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] uppercase font-bold text-brand-gold-500 bg-brand-red-950 px-2 py-0.5 rounded">
                            {n.category}
                          </span>
                          <button
                            onClick={() => deleteNotice(n._id)}
                            className="text-red-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <h4 className="font-bold text-white text-sm mt-2">{n.title}</h4>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">{n.content}</p>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ADMINISTRATOR DASHBOARD VIEW */}
          {/* ========================================================================= */}
          {user.role === 'admin' && (
            <div className="space-y-8">
              {/* Overall Database Statistics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <GlassCard hoverEffect={false} className="p-5 flex items-center space-x-4">
                  <div className="bg-brand-red-950 p-3 rounded-lg text-brand-gold-500 border border-brand-red-900/30">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{admissions.length}</div>
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Admission Requests</div>
                  </div>
                </GlassCard>

                <GlassCard hoverEffect={false} className="p-5 flex items-center space-x-4">
                  <div className="bg-brand-red-950 p-3 rounded-lg text-brand-gold-500 border border-brand-red-900/30">
                    <Megaphone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{notices.length}</div>
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Broadcast Notices</div>
                  </div>
                </GlassCard>

                <GlassCard hoverEffect={false} className="p-5 flex items-center space-x-4">
                  <div className="bg-brand-red-950 p-3 rounded-lg text-brand-gold-500 border border-brand-red-900/30">
                    <Clipboard className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{grades.length}</div>
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Student Transcripts</div>
                  </div>
                </GlassCard>

                <GlassCard hoverEffect={false} className="p-5 flex items-center space-x-4">
                  <div className="bg-brand-red-950 p-3 rounded-lg text-brand-gold-500 border border-brand-red-900/30">
                    <CheckSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{admissions.filter(a => a.status === 'approved').length}</div>
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Approved Seats</div>
                  </div>
                </GlassCard>
              </div>

              {/* Admissions Manager */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <Users className="h-6 w-6 text-brand-gold-500" />
                  <span>Manage Admissions Inquiries</span>
                </h2>
                <GlassCard hoverEffect={false} className="p-0 overflow-hidden">
                  {admissions.length === 0 ? (
                    <p className="text-sm text-gray-400 py-10 text-center font-light">No admission inquiries registered.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="bg-white/5 text-gray-400 font-semibold border-b border-white/10">
                            <th className="p-4">Student Details</th>
                            <th className="p-4">Parent Details</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {admissions.map((a) => (
                            <tr key={a._id} className="text-gray-300 hover:bg-white/5 transition-colors">
                              <td className="p-4">
                                <div className="font-bold text-white">{a.studentName}</div>
                                <div className="text-[10px] text-brand-gold-500 font-semibold mt-0.5">{a.grade}</div>
                                {a.additionalInfo && (
                                  <div className="text-[11px] text-gray-400 font-light mt-1.5 bg-white/5 rounded p-2 italic leading-relaxed">
                                    "{a.additionalInfo}"
                                  </div>
                                )}
                              </td>
                              <td className="p-4 font-medium text-white">{a.parentName}</td>
                              <td className="p-4 text-xs">
                                <div>{a.email}</div>
                                <div className="text-gray-400 mt-1">{a.phone}</div>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-full ${
                                  a.status === 'approved' 
                                    ? 'bg-green-950/40 text-green-400 border border-green-500/25' 
                                    : a.status === 'rejected' 
                                    ? 'bg-red-950/40 text-red-400 border border-red-500/25' 
                                    : 'bg-yellow-950/40 text-yellow-500 border border-yellow-500/25'
                                }`}>
                                  {a.status}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex justify-center items-center space-x-2">
                                  {a.status !== 'approved' && (
                                    <button
                                      onClick={() => updateAdmissionStatus(a._id, 'approved')}
                                      className="bg-green-900/30 hover:bg-green-800 text-green-400 p-1.5 rounded border border-green-500/10 transition-colors"
                                      title="Approve"
                                    >
                                      <Check className="h-4.5 w-4.5" />
                                    </button>
                                  )}
                                  {a.status !== 'rejected' && (
                                    <button
                                      onClick={() => updateAdmissionStatus(a._id, 'rejected')}
                                      className="bg-red-900/30 hover:bg-red-800 text-red-400 p-1.5 rounded border border-red-500/10 transition-colors"
                                      title="Reject"
                                    >
                                      <X className="h-4.5 w-4.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </GlassCard>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

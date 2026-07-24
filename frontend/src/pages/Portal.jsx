import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import GlassCard from '../components/GlassCard';
import { LogIn, UserPlus, ShieldAlert, Key } from 'lucide-react';

const Portal = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuickLogin = (email) => {
    setFormData({
      ...formData,
      email: email,
      password: 'password123'
    });
    setActiveTab('login');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'login') {
        const data = await authAPI.login(formData.email, formData.password);
        localStorage.setItem('token', data.token);
        onLogin(data.user);
        navigate('/dashboard');
      } else {
        const data = await authAPI.register(formData.name, formData.email, formData.password, formData.role);
        localStorage.setItem('token', data.token);
        onLogin(data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 max-w-md mx-auto px-4">
      <GlassCard className="space-y-6" hoverEffect={false}>
        {/* Logo Icon and Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight font-display text-white">VVS Portal</h1>
          <p className="text-xs text-gray-400 font-light">Access your personal school dashboard</p>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-white/5">
          <button
            className={`flex-1 pb-3 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === 'login' 
                ? 'border-brand-gold-500 text-brand-gold-500' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => {
              setActiveTab('login');
              setError('');
            }}
          >
            Sign In
          </button>
          <button
            className={`flex-1 pb-3 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === 'register' 
                ? 'border-brand-gold-500 text-brand-gold-500' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => {
              setActiveTab('register');
              setError('');
            }}
          >
            Register
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-950/40 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs font-semibold flex items-center space-x-2">
            <ShieldAlert className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'register' && (
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="glass-input text-sm"
                placeholder="e.g. Aarav Mehta"
                required
              />
            </div>
          )}

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="glass-input text-sm"
              placeholder="name@vasantvalley.edu"
              required
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="glass-input text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          {activeTab === 'register' && (
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Select Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="glass-input text-sm bg-brand-dark"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher / Faculty</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-red-600 to-brand-red-800 hover:from-brand-red-500 hover:to-brand-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 shadow shadow-brand-red-950 disabled:opacity-50 mt-6"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-r-2 border-transparent"></div>
            ) : activeTab === 'login' ? (
              <>
                <span>Sign In</span>
                <LogIn className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Create Account</span>
                <UserPlus className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Testing accounts panel */}
        <div className="border-t border-white/5 pt-6 space-y-3">
          <div className="flex items-center space-x-1.5 text-brand-gold-500">
            <Key className="h-3.5 w-3.5" />
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider">Quick Accounts for Evaluation:</h4>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickLogin('student@vasantvalley.edu')}
              className="bg-white/5 hover:bg-white/10 border border-white/5 rounded py-2 px-1 text-[10px] text-gray-300 font-semibold"
            >
              Student
            </button>
            <button
              onClick={() => handleQuickLogin('teacher@vasantvalley.edu')}
              className="bg-white/5 hover:bg-white/10 border border-white/5 rounded py-2 px-1 text-[10px] text-gray-300 font-semibold"
            >
              Teacher
            </button>
            <button
              onClick={() => handleQuickLogin('admin@vasantvalley.edu')}
              className="bg-white/5 hover:bg-white/10 border border-white/5 rounded py-2 px-1 text-[10px] text-gray-300 font-semibold"
            >
              Admin
            </button>
          </div>
          <p className="text-[9px] text-gray-500 text-center">Password is <code className="bg-white/5 px-1 rounded text-gray-400">password123</code> for all default accounts.</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Portal;

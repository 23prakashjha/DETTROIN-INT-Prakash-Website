import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Portal from './pages/Portal';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import VisionPhilosophy from './pages/VisionPhilosophy';
import InternationalCurriculum from './pages/InternationalCurriculum';
import Infrastructure from './pages/Infrastructure';
import NewsEvents from './pages/NewsEvents';
import { authAPI } from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await authAPI.getMe();
        setUser(userData);
      } catch (err) {
        console.warn('Failed to restore session:', err.message);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-darker flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-gold-500 border-r-2 border-transparent"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-brand-darker flex flex-col justify-between">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="flex-grow page-transition">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vision-philosophy" element={<VisionPhilosophy />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/international-curriculum" element={<InternationalCurriculum />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route 
              path="/portal" 
              element={
                user ? <Navigate to="/dashboard" replace /> : <Portal onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? <Dashboard user={user} /> : <Navigate to="/portal" replace />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

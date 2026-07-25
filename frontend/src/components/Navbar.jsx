import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, LogOut, User, ChevronDown, BookOpen, ClipboardList, ShieldCheck } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/academics', label: 'Academics' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/news-events', label: 'News' },
    { path: '/contact', label: 'Contact' },
    { path: '/admissions', label: 'Admissions' },
  ];

  const moreLinks = [
    { path: '/vision-philosophy', label: 'Vision & Philosophy' },
    { path: '/international-curriculum', label: 'International' },
    { path: '/infrastructure', label: 'Infrastructure' },
  ];

  const isActive = (path) => location.pathname === path;

  const activeLinkClass = "text-brand-gold-500 font-semibold";
  const inactiveLinkClass = "text-gray-300 hover:text-white font-medium transition-colors";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-darker/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            aria-label="Vasant Valley School Home"
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-red-500 to-brand-red-700 p-2 rounded-xl group-hover:from-brand-red-400 group-hover:to-brand-red-600 transition-all duration-300 shadow-lg shadow-brand-red-950/50">
                <GraduationCap className="h-6 w-6 text-brand-gold-100" aria-hidden="true" />
              </div>
              {scrolled && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-gold-500 rounded-full border-2 border-brand-darker" />
              )}
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white block leading-tight">
                VASANT VALLEY
              </span>
              <span className="text-[9px] text-brand-gold-500 tracking-[0.2em] font-semibold block uppercase">
                Excellence In Deed
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1" role="menubar">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-[13px] rounded-lg transition-all duration-200 relative ${
                  isActive(link.path)
                    ? activeLinkClass + ' bg-brand-gold-500/5'
                    : inactiveLinkClass
                }`}
                role="menuitem"
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-gold-500 rounded-full" />
                )}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'more' ? null : 'more')}
                className="flex items-center space-x-1 px-3 py-2 text-[13px] text-gray-300 hover:text-white font-medium transition-colors rounded-lg hover:bg-white/5"
              >
                <span>More</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'more' && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/30 py-2 animate-fade-in z-50">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        isActive(link.path)
                          ? 'text-brand-gold-500 bg-brand-gold-500/5'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {user && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 text-[13px] rounded-lg transition-all duration-200 ${
                  isActive('/dashboard')
                    ? activeLinkClass + ' bg-brand-gold-500/5'
                    : inactiveLinkClass
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* User Portal Action */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full pl-4 pr-1.5 py-1.5 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-red-500 to-brand-red-700 flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-brand-gold-100" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-200 leading-tight">{user.name.split(' ')[0]}</span>
                    <span className="text-[9px] text-brand-gold-500 font-semibold uppercase tracking-wider">{user.role}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    navigate('/');
                  }}
                  className="bg-brand-red-800 hover:bg-brand-red-700 text-white rounded-full p-2 transition-colors btn-press"
                  title="Logout"
                  aria-label="Logout from your account"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <Link
                to="/portal"
                className="bg-gradient-to-r from-brand-red-600 to-brand-red-800 hover:from-brand-red-500 hover:to-brand-red-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-brand-red-950/50 hover:shadow-brand-red-950/70 transition-all duration-300 border border-brand-red-500/20 btn-press"
              >
                Portal Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {!user && (
              <Link
                to="/portal"
                className="bg-gradient-to-r from-brand-red-600 to-brand-red-800 hover:from-brand-red-500 hover:to-brand-red-700 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-lg shadow-brand-red-950/50 transition-all duration-300 border border-brand-red-500/20 btn-press"
              >
                Portal Login
              </Link>
            )}
            {user && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-red-500 to-brand-red-700 flex items-center justify-center">
                <User className="h-4 w-4 text-brand-gold-100" />
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 focus:outline-none btn-press rounded-lg hover:bg-white/5 transition-all"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
        role="menu"
      >
        <div className="bg-brand-darker/98 backdrop-blur-2xl border-t border-white/5 px-4 pt-4 pb-6 space-y-1 mt-2">
          {/* User info for mobile */}
          {user && (
            <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-red-500 to-brand-red-700 flex items-center justify-center">
                <User className="h-5 w-5 text-brand-gold-100" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{user.name}</div>
                <div className="text-xs text-brand-gold-500 capitalize font-medium">{user.role} Account</div>
              </div>
            </div>
          )}

          {/* Main links */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-xl text-base transition-all ${
                isActive(link.path)
                  ? 'bg-brand-red-900/30 text-brand-gold-500 font-semibold border-l-2 border-brand-gold-500'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}

          {/* Separator */}
          <div className="border-t border-white/5 my-3" />

          {/* More links */}
          <div className="px-4 py-1">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">More</span>
          </div>
          {moreLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2.5 rounded-xl text-sm transition-all ${
                isActive(link.path)
                  ? 'bg-brand-red-900/30 text-brand-gold-500 font-semibold'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <Link
              to="/dashboard"
              className={`block px-4 py-3 rounded-xl text-base transition-all ${
                isActive('/dashboard')
                  ? 'bg-brand-red-900/30 text-brand-gold-500 font-semibold'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
              role="menuitem"
            >
              Dashboard
            </Link>
          )}

          {/* Role-based quick links when logged in */}
          {user && (
            <div className="px-4 py-1">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Quick Access</span>
            </div>
          )}
          {user && user.role === 'student' && (
            <>
              <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all" role="menuitem" onClick={() => setIsOpen(false)}>
                <BookOpen className="h-4 w-4 text-brand-gold-500" />
                <span>My Grades</span>
              </Link>
              <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all" role="menuitem" onClick={() => setIsOpen(false)}>
                <ClipboardList className="h-4 w-4 text-brand-gold-500" />
                <span>Notice Board</span>
              </Link>
            </>
          )}
          {user && user.role === 'teacher' && (
            <>
              <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all" role="menuitem" onClick={() => setIsOpen(false)}>
                <ClipboardList className="h-4 w-4 text-brand-gold-500" />
                <span>Publish Grades</span>
              </Link>
              <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all" role="menuitem" onClick={() => setIsOpen(false)}>
                <BookOpen className="h-4 w-4 text-brand-gold-500" />
                <span>Manage Notices</span>
              </Link>
            </>
          )}
          {user && user.role === 'admin' && (
            <>
              <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all" role="menuitem" onClick={() => setIsOpen(false)}>
                <ShieldCheck className="h-4 w-4 text-brand-gold-500" />
                <span>Manage Admissions</span>
              </Link>
              <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all" role="menuitem" onClick={() => setIsOpen(false)}>
                <ClipboardList className="h-4 w-4 text-brand-gold-500" />
                <span>Database Stats</span>
              </Link>
            </>
          )}

          {/* Action buttons */}
          <div className="border-t border-white/5 pt-4 mt-3 space-y-3 px-2">
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  navigate('/');
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-brand-red-800 hover:bg-brand-red-700 text-white rounded-xl py-3 transition-colors text-sm font-semibold btn-press"
                aria-label="Logout from your account"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span>Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/portal"
                  className="w-full block text-center bg-gradient-to-r from-brand-red-600 to-brand-red-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-brand-red-950 btn-press"
                  onClick={() => setIsOpen(false)}
                >
                  Portal Login
                </Link>
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider text-center">Quick Demo Login</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      to="/portal"
                      onClick={() => setIsOpen(false)}
                      className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2.5 text-[11px] text-gray-300 font-semibold transition-colors text-center"
                    >
                      Student
                    </Link>
                    <Link
                      to="/portal"
                      onClick={() => setIsOpen(false)}
                      className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2.5 text-[11px] text-gray-300 font-semibold transition-colors text-center"
                    >
                      Teacher
                    </Link>
                    <Link
                      to="/portal"
                      onClick={() => setIsOpen(false)}
                      className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2.5 text-[11px] text-gray-300 font-semibold transition-colors text-center"
                    >
                      Admin
                    </Link>
                  </div>
                  <p className="text-[9px] text-gray-500 text-center">Password: <code className="bg-white/5 px-1 rounded text-gray-400">password123</code></p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

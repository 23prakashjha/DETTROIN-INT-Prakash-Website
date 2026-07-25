import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, ArrowUpRight, Heart } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-darker border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-red-900/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-brand-gold-700/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Newsletter CTA */}
        <div className="py-12 border-b border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-xl font-bold text-white">Stay Connected with VVS</h3>
              <p className="text-sm text-gray-400 font-light">Get the latest news, events, and updates delivered to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="glass-input text-sm flex-1 md:w-72 rounded-r-none border-r-0"
              />
              <button className="bg-gradient-to-r from-brand-red-600 to-brand-red-800 hover:from-brand-red-500 hover:to-brand-red-700 text-white font-bold px-6 py-2.5 rounded-r-lg transition-all text-sm btn-press whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* Brand Info */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center space-x-3" onClick={scrollToTop}>
              <div className="bg-gradient-to-br from-brand-red-500 to-brand-red-700 p-2 rounded-xl shadow-lg shadow-brand-red-950/50">
                <GraduationCap className="h-6 w-6 text-brand-gold-100" />
              </div>
              <div>
                <span className="font-display font-extrabold text-lg tracking-tight text-white block leading-tight">
                  VASANT VALLEY
                </span>
                <span className="text-[9px] text-brand-gold-500 tracking-[0.2em] font-semibold block uppercase">
                  Excellence In Deed
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Accepting challenges, seeking excellence, and celebrating diversity since 1990. A premier co-educational day school in New Delhi.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: FacebookIcon, label: 'Facebook' },
                { icon: TwitterIcon, label: 'Twitter' },
                { icon: InstagramIcon, label: 'Instagram' },
                { icon: LinkedinIcon, label: 'LinkedIn' }
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="group relative bg-white/5 hover:bg-brand-red-800 border border-white/5 hover:border-brand-red-700 p-2.5 rounded-xl transition-all duration-300"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-bold mb-5 text-sm uppercase tracking-wider text-brand-gold-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/academics', label: 'Academics' },
                { to: '/admissions', label: 'Admissions' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/portal', label: 'Student Portal' }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={scrollToTop}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center space-x-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* School Community */}
          <div>
            <h3 className="text-white font-display font-bold mb-5 text-sm uppercase tracking-wider text-brand-gold-500">
              Community
            </h3>
            <ul className="space-y-3">
              {[
                { href: '#admin', label: 'Administration' },
                { href: '#alumni', label: 'Alumni Network' },
                { href: '#careers', label: 'Careers @ VVS' },
                { href: '#compliance', label: 'Statutory Compliances' },
                { href: '#pta', label: 'Parent-Teacher Association' },
                { href: '#safety', label: 'Safety & Security' }
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center space-x-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-display font-bold mb-5 text-sm uppercase tracking-wider text-brand-gold-500">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <div className="bg-brand-red-950/60 p-2 rounded-lg border border-brand-red-900/30 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-brand-red-400" />
                </div>
                <span className="font-light leading-relaxed">Sector C, Vasant Kunj, New Delhi, India 110070</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <div className="bg-brand-red-950/60 p-2 rounded-lg border border-brand-red-900/30 flex-shrink-0">
                  <Phone className="h-4 w-4 text-brand-red-400" />
                </div>
                <span className="font-light">+91 (11) 26896508</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <div className="bg-brand-red-950/60 p-2 rounded-lg border border-brand-red-900/30 flex-shrink-0">
                  <Mail className="h-4 w-4 text-brand-red-400" />
                </div>
                <span className="font-light">vasantvalley@vvs.edu</span>
              </li>
            </ul>

            {/* School Hours */}
            <div className="mt-6 bg-white/5 border border-white/5 rounded-xl p-4">
              <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">School Hours</h4>
              <div className="space-y-1 text-xs text-gray-400 font-light">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span className="text-gray-300">7:30 AM - 2:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sat:</span>
                  <span className="text-gray-300">8:00 AM - 1:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p className="flex items-center space-x-1">
            <span>&copy; {new Date().getFullYear()} Vasant Valley School. Redesigned with</span>
            <Heart className="h-3 w-3 text-brand-red-500 fill-brand-red-500" />
            <span>using MERN portal. All rights reserved.</span>
          </p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Use</a>
            <a href="#sitemap" className="hover:text-gray-400 transition-colors">Sitemap</a>
            <button
              onClick={scrollToTop}
              className="bg-white/5 hover:bg-white/10 border border-white/5 p-1.5 rounded-lg transition-all"
              aria-label="Back to top"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

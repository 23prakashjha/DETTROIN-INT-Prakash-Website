import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Calendar, ArrowRight, Filter } from 'lucide-react';

const NewsEvents = () => {
  const [selectedMonth, setSelectedMonth] = useState('All');
  
  const newsEvents = [
    {
      id: 1,
      title: 'Delhi State Open Summer Athletics Championships',
      date: '2 June 2026 - 5 June 2026',
      category: 'Sports',
      description: 'Our students participated and excelled in the Delhi State Open Summer Athletics Championships, bringing home multiple medals.',
      image: '/school_sports_track.jpg'
    },
    {
      id: 2,
      title: '33rd Asian Junior Squash Championship 2026',
      date: '24 May 2026',
      category: 'Sports',
      description: 'Vasant Valley School hosted the prestigious 33rd Asian Junior Squash Championship, welcoming participants from across Asia.',
      image: '/school_sports_new.jpg'
    },
    {
      id: 3,
      title: 'CBSE Class XII 2026 – Results at a Glance',
      date: '13 May 2026',
      category: 'Academics',
      description: 'Congratulations to our Class XII students for achieving outstanding results in the CBSE Board Examinations 2026.',
      image: '/school_education.jpg'
    },
    {
      id: 4,
      title: 'CBSE Class X Results – 2026',
      date: '15 April 2026',
      category: 'Academics',
      description: 'Our Class X students have performed exceptionally well in the CBSE Board Examinations, maintaining the school tradition of academic excellence.',
      image: '/school_classroom_new.jpg'
    },
    {
      id: 5,
      title: 'AI by HER Bootcamp and Innovation Showcase – Global AI Summit 2026',
      date: '16 February 2026',
      category: 'Technology',
      description: 'Students participated in the AI by HER Bootcamp and showcased their innovative projects at the Global AI Summit 2026.',
      image: '/school_computer_lab.jpg'
    },
    {
      id: 6,
      title: 'Inter School Step by Step Tournaments 2026',
      date: '17 February 2026 - 18 February 2026',
      category: 'Sports',
      description: 'Our teams competed in various sports at the Inter School Step by Step Tournaments, demonstrating skill and sportsmanship.',
      image: '/school_basketball.jpg'
    },
    {
      id: 7,
      title: 'Cambridge Inter-School Football Tournament 2026',
      date: '2 February 2026 - 6 February 2026',
      category: 'Sports',
      description: 'Vasant Valley School hosted and participated in the Cambridge Inter-School Football Tournament 2026.',
      image: '/school_team.jpg'
    }
  ];

  const categories = ['All', 'Sports', 'Academics', 'Technology'];
  const months = ['All', 'June 2026', 'May 2026', 'April 2026', 'February 2026'];

  const filteredEvents = newsEvents.filter(event => {
    const categoryMatch = selectedMonth === 'All' || 
      (selectedMonth === 'All' ? true : event.date.includes(selectedMonth.split(' ')[0]));
    return categoryMatch;
  });

  return (
    <div className="pt-32 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-4" aria-labelledby="news-heading">
        <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Latest Updates</span>
        <h1 id="news-heading" className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          News & <span className="gold-gradient">Events</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light text-sm sm:text-base">
          Stay updated with the latest news, events, and achievements from Vasant Valley School.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4 border-b border-white/5 pb-6 w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-brand-gold-500" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Filter by Month:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {months.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedMonth === month 
                    ? 'bg-brand-red-800 text-white shadow shadow-brand-red-950 border border-brand-red-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <GlassCard key={event.id} className="p-0 overflow-hidden flex flex-col justify-between group h-full" hoverEffect={true}>
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker to-transparent opacity-85" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase font-bold text-brand-gold-500 bg-brand-red-950 border border-brand-red-900/30 px-2 py-1 rounded">
                  {event.category}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                <span>{event.date}</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-brand-gold-500 transition-colors">
                {event.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {event.description}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Archive Section */}
      <section className="max-w-4xl mx-auto">
        <GlassCard className="space-y-6" hoverEffect={false}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Browse Archives</h2>
            <div className="flex items-center space-x-2 text-brand-gold-500 hover:text-brand-gold-600 cursor-pointer">
              <span className="text-sm font-semibold">View All Archives</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['June 2026', 'May 2026', 'April 2026', 'March 2026', 'February 2026', 'January 2026', 'December 2025', 'November 2025'].map((month) => (
              <button
                key={month}
                className="text-xs text-gray-400 hover:text-white hover:bg-white/5 py-2 px-3 rounded-lg transition-all"
              >
                {month}
              </button>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Social Media */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Follow Us on Social Media</h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm font-light">
          Stay connected with Vasant Valley School through our social media channels for real-time updates and highlights.
        </p>
        <div className="flex justify-center items-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-brand-gold-500 transition-colors" aria-label="Instagram">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-brand-gold-500 transition-colors" aria-label="Facebook">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-brand-gold-500 transition-colors" aria-label="Twitter">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-brand-gold-500 transition-colors" aria-label="YouTube">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default NewsEvents;

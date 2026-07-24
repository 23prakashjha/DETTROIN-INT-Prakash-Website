import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus('Please fill in all fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    setStatus('Sending feedback...');
    setTimeout(() => {
      setStatus('Thank you! Your feedback message has been recorded.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const faqs = [
    {
      q: 'What is the school fee schedule?',
      a: 'Fee schedules vary by class grade. Detail brochures can be downloaded from our admissions office, or parent portal, following secondary verification.'
    },
    {
      q: 'Does Vasant Valley offer transport facilities?',
      a: 'Yes, our certified bus fleet covers major regions across New Delhi and Gurgaon. Routes are GPS-monitored.'
    },
    {
      q: 'What is the curriculum pattern?',
      a: 'We offer national CBSE curriculum alongside Cambridge IGCSE and Advanced Level programs for classes IX to XII.'
    }
  ];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4" aria-labelledby="contact-heading">
        <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Contact Us</span>
        <h1 id="contact-heading" className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Get in <span className="gold-gradient">Touch</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light text-sm sm:text-base">
          Have an inquiry, feedback, or need assistance? Reach out to our administrative desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info list */}
        <div className="lg:col-span-5 space-y-8">
          <GlassCard className="space-y-6" hoverEffect={false}>
            <h2 className="text-2xl font-bold text-white">General Administration Desk</h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin className="h-5.5 w-5.5 text-brand-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-white">Postal Address</h4>
                  <p className="text-xs mt-1">Sector C, Vasant Kunj, New Delhi 110070</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <Phone className="h-5.5 w-5.5 text-brand-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-white">Telephones</h4>
                  <p className="text-xs mt-1">+91 11 41767940</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <Mail className="h-5.5 w-5.5 text-brand-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-semibold text-white">General Inquiries</h4>
                  <p className="text-xs mt-1">info@vasantvalley.edu.in</p>
                </div>
              </li>
            </ul>
          </GlassCard>

          {/* FAQs */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-brand-gold-500" aria-hidden="true" />
              <span>FAQ Guide</span>
            </h3>
            {faqs.map((f, index) => (
              <GlassCard key={index} className="p-4" hoverEffect={false}>
                <h4 className="font-bold text-white text-xs sm:text-sm">{f.q}</h4>
                <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">{f.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Feedback form */}
        <div className="lg:col-span-7">
          <GlassCard hoverEffect={false}>
            <h2 className="text-2xl font-bold text-white mb-6">Leave Feedback / Query</h2>
            {status && (
              <div className={`p-4 rounded-lg border text-xs font-semibold mb-6 ${
                status.includes('Thank you') 
                  ? 'bg-green-950/30 text-green-400 border-green-500/20' 
                  : status.includes('Please') || status.includes('valid')
                  ? 'bg-red-950/30 text-red-400 border-red-500/20'
                  : 'bg-brand-red-950/30 text-brand-gold-500 border-brand-red-900/30'
              }`} role="alert">
                {status}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="contact-name" className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="glass-input text-sm"
                    placeholder="e.g. Aarav Mehta"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="contact-email" className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Your Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="glass-input text-sm"
                    placeholder="name@example.com"
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="contact-subject" className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="glass-input text-sm"
                  placeholder="e.g. Sports Equipment suggestion"
                  required
                  aria-required="true"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="contact-message" className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Message / Feedback</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="glass-input text-sm resize-none"
                  placeholder="Type your message details here..."
                  required
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-red-600 to-brand-red-800 hover:from-brand-red-500 hover:to-brand-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 btn-press"
              >
                <span>Submit Query</span>
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Contact;

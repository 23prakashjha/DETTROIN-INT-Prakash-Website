import React from 'react';
import GlassCard from '../components/GlassCard';
import { Compass, Users, History, Award } from 'lucide-react';

const About = () => {
  const leadership = [
    {
      name: 'Mrs. Rekha Purie',
      role: 'Chairperson',
      description: 'Founder and Chairperson of Vasant Valley School, envisioned a learning experience where Arts and Sports are as important as academic learning.'
    },
    {
      name: 'Mr. Aroon Purie',
      role: 'Founder',
      description: 'Co-founder who established the school with Mrs. Rekha Purie in 1990 as an initiative of the Education Today Trust.'
    },
    {
      name: 'Mr. Ved Vyas',
      role: 'Founder-Principal',
      description: 'Founder-Principal of Modern School, Vasant Vihar. Wrote the lyrics of the School Song "Shreshtha Tamaya Karmane" which translates to "Excellence in Deed".'
    },
    {
      name: 'Mr. Arun Kapur',
      role: 'Former Headmaster (1990-2020)',
      description: 'Appointed the first Headmaster in 1990, led the school for 30 years, building it into one of India\'s foremost coeducational day schools.'
    },
    {
      name: 'Ms. Rekha Krishnan',
      role: 'Principal (2006-2025)',
      description: 'Served as Principal from 2006 to March 2025, continuing the tradition of educational excellence.'
    }
  ];

  const formerLeadership = [
    { name: 'Ranu Dattagupta', role: 'Principal 1998-1999', period: 'Head of Senior School 1997-1999' },
    { name: 'Paramjit Kaur Narang', role: 'Head of School 2001-2002', period: 'Head of Senior School 2000-2001, Head of Junior School 1993-2000' },
    { name: 'Peilu Oberoi', role: 'Principal 2000-2006', period: 'Head of Junior School 2000-2006' },
    { name: 'Rekha Bakshi', role: 'Head of Junior School', period: '2006-2019' },
    { name: 'Abha Ranjan', role: 'Head of Special Section', period: '1997-2002' },
    { name: 'Shalini Dave', role: 'Head of Special Section', period: '2002-2012' },
    { name: 'Sushmita Mitra', role: 'Head of Special Section', period: '2012-2022' }
  ];

  return (
    <div className="pt-32 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Intro Header */}
      <section className="text-center space-y-4" aria-labelledby="about-heading">
        <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">About Us</span>
        <h1 id="about-heading" className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Our <span className="gold-gradient">Heritage & Vision</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed font-light text-sm sm:text-base">
          Vasant Valley School has been a pioneer in student-centered, holistic education since 1990.
        </p>
      </section>

      {/* History & Core Values Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" aria-labelledby="history-heading">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <History className="h-6 w-6 text-brand-gold-500" aria-hidden="true" />
            <h2 id="history-heading" className="text-2xl font-bold">Our Journey Since 1990</h2>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            Vasant Valley School was established in 1990 by Mr. Aroon Purie and Mrs. Rekha Purie as an initiative of the Education Today Trust. The school began its journey with around 200 students and 16 teachers in July 1990.
          </p>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            It is a self-financing inclusive day school spread over eight acres of land in Vasant Kunj, New Delhi, India. Mr. and Mrs. Purie envisioned a learning experience in which the Arts and Sports are as important as academic learning and wanted to create a paradigm where being a good citizen was more important than being a good student.
          </p>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            Vasant Valley School aims to nurture independent minds, and create a space where students are encouraged to actualise their innate and unique potential.
          </p>
        </div>
        
        <GlassCard className="space-y-6" hoverEffect={false}>
          <div className="flex items-center space-x-3">
            <Compass className="h-6 w-6 text-brand-gold-500" aria-hidden="true" />
            <h2 className="text-xl font-bold">The Vasant Valley Motto</h2>
          </div>
          <blockquote className="border-l-4 border-brand-red-500 pl-4 py-1 italic text-gray-300 text-sm">
            "Excellence in Deed" - The School's motto sets the standard. Individualized attention for each student, a "process-focused" learning framework, equity of all stakeholders and commitment to society are the pillars of the School's philosophy.
          </blockquote>
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 font-light pt-2">
            <div>
              <strong className="text-white block mb-1">Empowerment</strong>
              Giving students the agency to manage notice boards, script podcasts, and organize assemblies.
            </div>
            <div>
              <strong className="text-white block mb-1">Inclusivity</strong>
              Support systems for special needs education and financial aids.
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Leadership Section */}
      <section className="space-y-12" aria-labelledby="leadership-heading">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Users className="h-6 w-6 text-brand-gold-500" aria-hidden="true" />
            <h2 id="leadership-heading" className="text-3xl font-extrabold tracking-tight">Our Leadership Team</h2>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light">
            Meet the administrators directing our faculty and student councils.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {leadership.map((l, index) => (
            <GlassCard key={index} className="flex flex-col justify-between text-center space-y-4" hoverEffect={true}>
              <div className="space-y-2">
                {/* Profile Placeholder Icon */}
                <div className="bg-brand-red-950/60 p-4 rounded-full w-16 h-16 flex items-center justify-center text-brand-gold-500 border border-brand-red-900/30 mx-auto shadow-inner">
                  <Users className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-white mt-4">{l.name}</h3>
                <div className="text-xs text-brand-gold-500 font-semibold uppercase tracking-wider">{l.role}</div>
              </div>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {l.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Former Leadership */}
      <section className="space-y-12" aria-labelledby="former-leadership-heading">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Award className="h-6 w-6 text-brand-gold-500" aria-hidden="true" />
            <h2 id="former-leadership-heading" className="text-3xl font-extrabold tracking-tight">Former Leadership</h2>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light">
            The School stands proud and tall on the shoulders of those who have strengthened the motto of Excellence in Deed over the last 30 years.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {formerLeadership.map((l, index) => (
            <GlassCard key={index} className="p-4 space-y-2" hoverEffect={false}>
              <h3 className="text-sm font-bold text-white">{l.name}</h3>
              <div className="text-xs text-brand-gold-500 font-semibold">{l.role}</div>
              <p className="text-[10px] text-gray-400 font-light">{l.period}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;

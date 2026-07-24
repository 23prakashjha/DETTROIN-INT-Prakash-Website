import React from 'react';
import GlassCard from '../components/GlassCard';
import { Award, Library, Beaker, Radio, Activity, Cpu } from 'lucide-react';

const Academics = () => {
  return (
    <div className="pt-32 pb-20 space-y-24">
      {/* Intro Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          The <span className="gold-gradient">Learning Experience</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed font-light text-sm sm:text-base">
          Our curriculum is structured to support intellectual curiosity, independence of thought, and high academic performance.
        </p>
      </section>

      {/* Curriculum Tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard className="space-y-4">
          <h3 className="text-xl font-bold text-brand-gold-500 font-display">Junior School (Nursery - Grade V)</h3>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            Focuses on foundational numeracy, language acquisition, creative arts, and environmental awareness. Learning is inquiry-based and experiential.
          </p>
          <div className="border-t border-white/5 pt-4 text-xs text-gray-500">
            Key areas: Phonics, Art & Expression, Mathematics, Nature Studies.
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <h3 className="text-xl font-bold text-brand-gold-500 font-display">Middle School (Grade VI - VIII)</h3>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            Introduces complex disciplines in sciences, history, computer programming, and secondary languages. Promotes collaborative lab work and analytical projects.
          </p>
          <div className="border-t border-white/5 pt-4 text-xs text-gray-500">
            Key areas: Physics/Chemistry/Biology labs, coding, algebra, second languages.
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <h3 className="text-xl font-bold text-brand-gold-500 font-display">Senior School & Cambridge</h3>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            Prepares students for CBSE and Cambridge IGCSE / A-Levels. Emphasizes advanced calculus, physics, international history, and college placement guidance.
          </p>
          <div className="border-t border-white/5 pt-4 text-xs text-gray-500">
            Key areas: Advanced Placement, Career Counseling, AS/A level courses.
          </div>
        </GlassCard>
      </section>

      {/* Facilities/Infrastructure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">World-Class Facilities</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light">
            Equipping students with modern tools to practice research, sports, and media.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex space-x-4">
            <div className="bg-brand-red-950/60 p-3 rounded-lg text-brand-gold-500 h-12 w-12 flex-shrink-0 flex items-center justify-center border border-brand-red-900/30">
              <Library className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Central Library</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Hosting over 25,000 volumes, international educational journals, digital resource centers, and comfortable private study cubicles.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="bg-brand-red-950/60 p-3 rounded-lg text-brand-gold-500 h-12 w-12 flex-shrink-0 flex items-center justify-center border border-brand-red-900/30">
              <Beaker className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Advanced Science Labs</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Separate fully equipped spaces for physics, chemistry, biology, and environment engineering labs with modern equipment.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="bg-brand-red-950/60 p-3 rounded-lg text-brand-gold-500 h-12 w-12 flex-shrink-0 flex items-center justify-center border border-brand-red-900/30">
              <Cpu className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Robotics & IT Labs</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Fitted with high-performance computing systems, 3D printers, IoT controller boards, and machine learning dev kits.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="bg-brand-red-950/60 p-3 rounded-lg text-brand-gold-500 h-12 w-12 flex-shrink-0 flex items-center justify-center border border-brand-red-900/30">
              <Activity className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Modern Sports Arena</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Includes synthetic basketball courts, standard football fields, indoor squash courts, swimming facilities, and gymnastic setups.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="bg-brand-red-950/60 p-3 rounded-lg text-brand-gold-500 h-12 w-12 flex-shrink-0 flex items-center justify-center border border-brand-red-900/30">
              <Radio className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">School Radio & Media</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                A fully operational production suite where students script, edit, and broadcast weekly podcasts and live radio bulletins.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="bg-brand-red-950/60 p-3 rounded-lg text-brand-gold-500 h-12 w-12 flex-shrink-0 flex items-center justify-center border border-brand-red-900/30">
              <Award className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Visual & Performing Arts</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Designed to nurture painters, sculptors, theatrical performers, and classic/western musicians with dedicated acoustical practice rooms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;

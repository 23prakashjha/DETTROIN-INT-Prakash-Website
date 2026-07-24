import React from 'react';
import GlassCard from '../components/GlassCard';
import { Globe, BookOpen, Award, GraduationCap, Target } from 'lucide-react';

const InternationalCurriculum = () => {
  return (
    <div className="pt-32 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="text-center space-y-4" aria-labelledby="international-heading">
        <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Global Education</span>
        <h1 id="international-heading" className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          International <span className="gold-gradient">Curriculum</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed font-light text-sm sm:text-base">
          Vasant Valley School offers internationally recognized curricula that prepare students for global opportunities while maintaining strong academic standards.
        </p>
      </section>

      {/* Cambridge Program Overview */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Cambridge Programme</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light">
            Internationally recognized qualifications that open doors to universities worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Cambridge IGCSE</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              The International General Certificate of Secondary Education (IGCSE) is offered to students in Classes IX and X. This curriculum develops creative thinking, problem-solving, and investigative skills.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Cambridge A & AS Levels</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Advanced Level qualifications for Classes XI and XII provide in-depth subject knowledge and prepare students for university education worldwide. Students can choose from a wide range of subjects.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Subject Offerings */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Subject Offerings</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light">
            Diverse subject choices to match student interests and career aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard className="space-y-4" hoverEffect={false}>
            <h3 className="text-lg font-bold text-brand-gold-500 font-display">Sciences</h3>
            <ul className="text-sm text-gray-400 space-y-2 font-light">
              <li>• Physics</li>
              <li>• Chemistry</li>
              <li>• Biology</li>
              <li>• Environmental Management</li>
            </ul>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={false}>
            <h3 className="text-lg font-bold text-brand-gold-500 font-display">Humanities</h3>
            <ul className="text-sm text-gray-400 space-y-2 font-light">
              <li>• Economics</li>
              <li>• Business Studies</li>
              <li>• Accounting</li>
              <li>• Global Perspectives</li>
            </ul>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={false}>
            <h3 className="text-lg font-bold text-brand-gold-500 font-display">Languages</h3>
            <ul className="text-sm text-gray-400 space-y-2 font-light">
              <li>• English Language</li>
              <li>• English Literature</li>
              <li>• Hindi</li>
              <li>• French/Spanish</li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* Benefits */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Why Cambridge?</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light">
            The advantages of choosing Cambridge curriculum for your child's education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <GlassCard className="space-y-4 text-center" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md mx-auto">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">Global Recognition</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Accepted by universities and employers worldwide as evidence of academic ability.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4 text-center" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md mx-auto">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">Skill Development</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Focus on developing critical thinking, problem-solving, and analytical skills.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4 text-center" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md mx-auto">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">Flexible Options</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Students can choose subjects that match their strengths and career goals.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4 text-center" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md mx-auto">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">Rigorous Standards</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Maintains high academic standards while encouraging independent learning.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Assessment Structure */}
      <section className="max-w-4xl mx-auto">
        <GlassCard className="space-y-6" hoverEffect={false}>
          <div className="flex items-center space-x-3">
            <Target className="h-6 w-6 text-brand-gold-500" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-white">Assessment Structure</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-300 font-light">
            <p>
              Cambridge assessments are designed to be fair and valid for all students. The assessment includes written examinations, coursework, and practical assessments depending on the subject.
            </p>
            <p>
              Grades are awarded on an eight-point scale from A* to G, with A* being the highest. Students who do not achieve the minimum standard receive a grade of U (unclassified).
            </p>
            <p>
              The flexible approach allows schools to offer a combination of subjects that best suits their students' needs and local context.
            </p>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default InternationalCurriculum;

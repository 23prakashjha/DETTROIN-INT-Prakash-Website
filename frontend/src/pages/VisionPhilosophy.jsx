import React from 'react';
import GlassCard from '../components/GlassCard';
import { Target, Heart, Users, Globe, Award } from 'lucide-react';

const VisionPhilosophy = () => {
  return (
    <div className="pt-32 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="text-center space-y-4" aria-labelledby="vision-heading">
        <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Our Foundation</span>
        <h1 id="vision-heading" className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Vision & <span className="gold-gradient">Philosophy</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed font-light text-sm sm:text-base">
          We at Vasant Valley School believe that each child entrusted to us will receive education in its finest form. Learning is a lifelong process, and all students and teachers are challenged to exceed their own expectations.
        </p>
      </section>

      {/* Main Philosophy */}
      <section className="max-w-4xl mx-auto">
        <GlassCard className="space-y-6" hoverEffect={false}>
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-brand-gold-500" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-white">Holistic Education</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            This is a holistic experience that synergises the growth of mind, body and spirit. We nurture and prepare generations of individuals, the torchbearers of tomorrow who believe in the strength of their own convictions and take pride in being Indian. They will work together in the spirit of Global Citizenship. Our work in school shapes the future and no constraints shall daunt us.
          </p>
        </GlassCard>
      </section>

      {/* Core Values */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Core Values</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light">
            The pillars that guide our educational philosophy and shape every aspect of school life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Excellence in Deed</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              The School's motto sets the standard. Individualized attention for each student, a "process-focused" learning framework, equity of all stakeholders and commitment to society are the pillars of our philosophy.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Individual Growth</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              We believe that education is an enjoyable and interactive process. Each child is unique and receives individualized attention to actualize their innate and unique potential.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Global Citizenship</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Students develop a sense of national identity as well as global citizenship. They work together in the spirit of cooperation and mutual respect.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Arts & Sports</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Arts and Sports are as important as academic learning. We create a paradigm where being a good citizen is more important than being a good student.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Compassionate Leaders</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              While high academic achievement is a priority, we aim to create a community of well-rounded individuals who are compassionate and confident.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Continuous Learning</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Learning is a lifelong process. All students and teachers are challenged to exceed their own expectations in a supportive environment.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Educational Philosophy</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light">
            The foundation of our approach to teaching and learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="space-y-4" hoverEffect={false}>
            <h3 className="text-xl font-bold text-brand-gold-500 font-display">Education is Preparation for Life</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              The school day comprises academic and non-academic Learning Experiences and is planned with special focus on the developmental needs of our students. The entire Campus is a "Classroom" and learning is continuous.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={false}>
            <h3 className="text-xl font-bold text-brand-gold-500 font-display">Learning with Understanding</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              We foster a spirit of cooperation and mutual respect among students and teachers. This creates an environment where independent minds can flourish and students are encouraged to actualize their potential.
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default VisionPhilosophy;

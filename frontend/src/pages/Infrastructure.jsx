import React from 'react';
import GlassCard from '../components/GlassCard';
import { Building, TreePine, Wrench, Users, ShieldCheck, Activity } from 'lucide-react';

const Infrastructure = () => {
  return (
    <div className="pt-32 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="text-center space-y-4" aria-labelledby="infrastructure-heading">
        <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Our Campus</span>
        <h1 id="infrastructure-heading" className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          World-Class <span className="gold-gradient">Infrastructure</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed font-light text-sm sm:text-base">
          The campus has sports fields, gardens, play areas and courtyards, with over 400 species of trees and plants. The school is surrounded by the busy neighbourhood of Vasant Kunj on one side and the main road connecting the capital city to the airport on the other.
        </p>
      </section>

      {/* Campus Overview */}
      <section className="max-w-4xl mx-auto">
        <GlassCard className="space-y-6" hoverEffect={false}>
          <div className="flex items-center space-x-3">
            <Building className="h-6 w-6 text-brand-gold-500" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-white">Campus Overview</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-300 font-light">
            <p>
              The school is spread over eight acres of land in Vasant Kunj, New Delhi. The red and beige sandstone building was designed and built keeping in mind the ideal environment for children, the philosophy of the school and evolving paradigms.
            </p>
            <p>
              The School is divided into two wings, with an open amphitheatre connecting them. This eight acre campus has a built-up area of four acres, while the rest of the space comprises a lush, green cover.
            </p>
            <p>
              While there is a planned space for every activity, there are also many open "mixed-use" areas. The entire campus is challenge compliant, ensuring accessibility for all students.
            </p>
          </div>
        </GlassCard>
      </section>

      {/* Learning Spaces */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Learning Spaces</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light">
            Modern facilities designed to enhance the learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <Building className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Modern Classrooms</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Well-ventilated, spacious classrooms equipped with modern teaching aids and smart boards to facilitate interactive learning.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <Wrench className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Science Laboratories</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              State-of-the-art physics, chemistry, and biology laboratories with modern equipment and safety features for hands-on learning.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Library & Resource Center</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              A well-stocked library with thousands of books, digital resources, and quiet study areas to encourage reading and research.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Computer Labs</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Advanced computer laboratories with high-speed internet and latest software to develop digital literacy skills.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Art Studios</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Dedicated art studios for painting, sculpture, and creative arts where students can explore their artistic talents.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={true}>
            <div className="bg-brand-red-950 border border-brand-red-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md">
              <TreePine className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Music & Dance Rooms</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Specialized rooms for music and dance with soundproofing and proper equipment for cultural education.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Sports Facilities */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Sports Facilities</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light">
              Comprehensive sports infrastructure to promote physical fitness and team spirit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="space-y-4" hoverEffect={false}>
            <h3 className="text-xl font-bold text-brand-gold-500 font-display">Athletic Complex</h3>
            <ul className="text-sm text-gray-400 space-y-2 font-light">
              <li>• All-weather football field</li>
              <li>• Synthetic running tracks</li>
              <li>• Basketball courts</li>
              <li>• Squash courts</li>
              <li>• Swimming pool</li>
              <li>• Gymnastics setup</li>
            </ul>
          </GlassCard>

          <GlassCard className="space-y-4" hoverEffect={false}>
            <h3 className="text-xl font-bold text-brand-gold-500 font-display">Indoor Sports</h3>
            <ul className="text-sm text-gray-400 space-y-2 font-light">
              <li>• Table tennis tables</li>
              <li>• Badminton courts</li>
              <li>• Yoga and meditation room</li>
              <li>• Indoor gymnasium</li>
              <li>• Chess room</li>
              <li>• Carrom board area</li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* Environmental Features */}
      <section className="max-w-4xl mx-auto">
        <GlassCard className="space-y-6" hoverEffect={false}>
          <div className="flex items-center space-x-3">
            <TreePine className="h-6 w-6 text-brand-gold-500" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-white">Green Campus</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-300 font-light">
            <p>
              The campus features over 400 species of trees and plants, creating a lush green environment that promotes environmental awareness among students.
            </p>
            <p>
              The carefully planned landscaping includes gardens, play areas, and courtyards that provide natural spaces for relaxation and outdoor learning activities.
            </p>
            <p>
              Environmental sustainability is integrated into campus operations, with rainwater harvesting, solar panels, and waste management systems in place.
            </p>
          </div>
        </GlassCard>
      </section>

      {/* Accessibility */}
      <section className="max-w-4xl mx-auto">
        <GlassCard className="space-y-6" hoverEffect={false}>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="h-6 w-6 text-brand-gold-500" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-white">Accessibility & Safety</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-300 font-light">
            <p>
              The entire campus is challenge compliant, ensuring that students with special needs can access all facilities comfortably.
            </p>
            <p>
              Safety measures include CCTV surveillance, fire safety systems, trained security personnel, and regular safety drills to ensure a secure learning environment.
            </p>
            <p>
              The campus is designed to be child-friendly with proper signage, safe play areas, and age-appropriate facilities for different age groups.
            </p>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default Infrastructure;

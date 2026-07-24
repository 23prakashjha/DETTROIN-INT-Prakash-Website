import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ShieldCheck, Award, Star, Compass, Bell, ChevronRight, Play, Quote, ChevronLeft, ChevronDown } from 'lucide-react';
import { noticesAPI } from '../services/api';
import GlassCard from '../components/GlassCard';
import { CardSkeleton } from '../components/Skeleton';

const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="counter-number">
      {prefix}{count}{suffix}
    </span>
  );
};

const Home = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const sectionRefs = useRef({});

  const heroSlides = [
    {
      image: '/school_campus_main.jpg',
      title: 'Nurturing Minds,\nAmplifying Excellence',
      subtitle: 'Vasant Valley School combines rigorous academics with global perspectives, creating lifelong learners and empathetic leaders.',
      badge: 'Top Ranked Co-Ed School in India'
    },
    {
      image: '/school_teaching.jpg',
      title: 'Where Every Child\nReaches Their Potential',
      subtitle: 'A holistic approach to education that nurtures the mind, body, and spirit of every student.',
      badge: 'Excellence in Deed Since 1990'
    },
    {
      image: '/school_library.jpg',
      title: 'Knowledge Without\nBoundaries',
      subtitle: 'Over 25,000 volumes, international journals, and digital resources for boundless exploration.',
      badge: 'World-Class Library & Resources'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Parent, Class XII',
      quote: 'Vasant Valley School has been transformative for our daughter. The holistic approach to education has helped her develop both academically and as a compassionate human being.',
      rating: 5
    },
    {
      name: 'Mr. Rajesh Khanna',
      role: 'Alumni, Batch of 2008',
      quote: 'The values and skills I learned at VVS continue to guide me in my professional life. The school truly lives up to its motto of Excellence in Deed.',
      rating: 5
    },
    {
      name: 'Ms. Anita Verma',
      role: 'Parent, Class VIII',
      quote: 'The personalized attention and modern teaching methods at Vasant Valley have made my son curious and confident. The sports and arts programs are exceptional.',
      rating: 5
    },
    {
      name: 'Dr. Suresh Patel',
      role: 'Parent, Class X',
      quote: 'Choosing Vasant Valley was the best decision. The Cambridge curriculum alongside CBSE gives students incredible flexibility and global exposure.',
      rating: 5
    }
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await noticesAPI.getAll();
        setNotices(data.slice(0, 4));
      } catch (err) {
        setNotices([
          {
            _id: '1',
            title: 'Admissions Open for Academic Year 2026-27',
            content: 'Vasant Valley School invites applications for admissions from Nursery to Class XI.',
            category: 'Admission',
            priority: 'high',
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            title: 'Annual Sports Day Postponement',
            content: 'Please note that the Annual Sports Day has been postponed to the following month.',
            category: 'Sports',
            priority: 'medium',
            createdAt: new Date().toISOString()
          },
          {
            _id: '3',
            title: 'VVS Wins Inter-School Science Congress',
            content: 'Congratulations to our senior science team for securing first place in the National Inter-School Science Congress!',
            category: 'Event',
            priority: 'medium',
            createdAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  // Hero auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Testimonial auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (key) => (ref) => {
    if (ref) sectionRefs.current[key] = ref;
  };

  const whyChooseUs = [
    {
      icon: ShieldCheck,
      title: 'Academic Excellence',
      description: 'Consistent 100% college placement rate with students joining top universities worldwide.',
      image: '/school_classroom_new.jpg'
    },
    {
      icon: Star,
      title: 'Holistic Development',
      description: 'Equal emphasis on academics, sports, arts, and character building for well-rounded growth.',
      image: '/school_students.jpg'
    },
    {
      icon: Compass,
      title: 'Global Perspective',
      description: 'Cambridge IGCSE & A-Levels alongside CBSE for internationally recognized qualifications.',
      image: '/school_education.jpg'
    },
    {
      icon: Award,
      title: 'World-Class Faculty',
      description: '1:9 teacher-student ratio ensuring personalized attention for every learner.',
      image: '/school_teaching.jpg'
    }
  ];

  const campusHighlights = [
    {
      image: '/school_campus_main.jpg',
      title: 'Main Campus',
      description: 'Eight acres of modern infrastructure with state-of-the-art classrooms and green lawns.',
      category: 'Campus'
    },
    {
      image: '/school_science_lab_new.jpg',
      title: 'Science Labs',
      description: 'Cutting-edge microscopes, digital sensors, and modern safety equipment for active research.',
      category: 'Labs'
    },
    {
      image: '/school_sports_new.jpg',
      title: 'Sports Complex',
      description: 'All-weather football field, synthetic running tracks, and multiple sports courts.',
      category: 'Athletics'
    },
    {
      image: '/school_library.jpg',
      title: 'Central Library',
      description: 'Over 25,000 volumes with digital resource centers and private study cubicles.',
      category: 'Academics'
    },
    {
      image: '/school_art_studio.jpg',
      title: 'Art Studios',
      description: 'Dedicated spaces for painting, sculpture, and creative expression.',
      category: 'Arts'
    },
    {
      image: '/school_music_room.jpg',
      title: 'Music & Dance',
      description: 'Soundproofed rooms with professional equipment for cultural education.',
      category: 'Arts'
    }
  ];

  return (
    <div className="space-y-0 pb-0">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
              heroSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Overlays - transparent enough to see images */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darker/70 via-brand-darker/40 to-brand-darker/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-darker/50 via-transparent to-brand-darker/50 z-10" />

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-brand-red-900/10 blur-[120px] animate-float z-10 pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-brand-gold-700/5 blur-[150px] animate-float-delayed z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.02] z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.01] z-10 pointer-events-none" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-10" />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-8 pt-20">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-brand-red-900/30 border border-brand-red-500/20 px-5 py-2 rounded-full text-xs font-semibold tracking-wider text-brand-gold-500 uppercase animate-fade-in-up backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>{heroSlides[heroSlide].badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.05] animate-fade-in-up delay-100">
            {heroSlides[heroSlide].title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {i === 1 ? <span className="gold-gradient">{line}</span> : line}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
            {heroSlides[heroSlide].subtitle}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up delay-300">
            <Link
              to="/admissions"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-brand-red-600 to-brand-red-800 hover:from-brand-red-500 hover:to-brand-red-700 shadow-xl shadow-brand-red-950/40 hover:shadow-brand-red-950/70 border border-brand-red-500/30 transition-all duration-300 flex items-center justify-center space-x-2 group btn-press"
            >
              <span>Apply Online</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/gallery"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-gray-300 hover:text-white glass-panel hover:bg-white/5 transition-all duration-300 flex items-center justify-center space-x-2 btn-press"
            >
              <Play className="h-5 w-5" />
              <span>Campus Tour</span>
            </Link>
          </div>

          {/* Hero Slide Indicators */}
          <div className="flex justify-center space-x-3 pt-4 animate-fade-in delay-500">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroSlide(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  heroSlide === index 
                    ? 'w-10 bg-brand-gold-500' 
                    : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce-gentle">
          <ChevronDown className="h-6 w-6 text-brand-gold-500/50" />
        </div>
      </section>

      {/* ========== ANNOUNCEMENT MARQUEE ========== */}
      <div className="bg-brand-red-950/80 border-y border-brand-red-900/50 py-3 overflow-hidden whitespace-nowrap flex items-center relative z-30">
        <div className="bg-gradient-to-r from-brand-red-700 to-brand-red-800 text-white text-[11px] font-bold tracking-widest px-4 py-1.5 uppercase rounded ml-4 relative z-10 shadow-lg flex-shrink-0 flex items-center space-x-1.5">
          <Bell className="h-3.5 w-3.5 animate-bounce" />
          <span>Live Updates</span>
        </div>
        <div className="animate-marquee inline-block text-sm text-gray-300 font-medium tracking-wide">
          {notices.map((n, i) => (
            <span key={n._id || i} className="mx-12">
              <span className="text-brand-gold-500 font-bold mr-2">&#10022;</span>
              {n.title}
            </span>
          ))}
        </div>
      </div>

      {/* ========== WHY CHOOSE US ========== */}
      <section
        id="why-choose"
        ref={setSectionRef('why-choose')}
        className="py-24 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-red-950/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Why Vasant Valley</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              A Legacy of <span className="gold-gradient">Excellence</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base font-light">
              Three decades of nurturing minds, building character, and creating global leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className={`glass-card-premium rounded-xl overflow-hidden group ${
                  visibleSections['why-choose'] ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-brand-red-950/80 border border-brand-red-900/30 p-2.5 rounded-lg">
                    <item.icon className="h-5 w-5 text-brand-gold-500" />
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VISION & VALUES ========== */}
      <section
        id="vision"
        ref={setSectionRef('vision')}
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Our Foundation</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Vision & Core Values
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base font-light">
            Guiding our students toward personal, physical, and developmental growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Compass,
              title: 'Excellence in Deed',
              description: 'We challenge students to perform to their highest potential in every academic subject, artistic medium, and athletic venture.',
              delay: '0ms'
            },
            {
              icon: Award,
              title: 'Integrity & Honor',
              description: 'Fostering deep-rooted values of personal responsibility, ethical judgment, community service, and respect for diversity.',
              delay: '100ms'
            },
            {
              icon: Star,
              title: 'Holistic Development',
              description: 'Encouraging independent research, creative thinking, digital literacy, artistic creativity, and competitive athletic skills.',
              delay: '200ms'
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`glass-card-premium rounded-xl p-6 space-y-4 ${
                visibleSections['vision'] ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: item.delay }}
            >
              <div className="bg-gradient-to-br from-brand-red-900/60 to-brand-red-950/80 border border-brand-red-800/30 p-3 rounded-xl w-12 h-12 flex items-center justify-center text-brand-gold-500 shadow-md shadow-brand-red-950/50">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== STATS COUNTER ========== */}
      <section
        id="stats"
        ref={setSectionRef('stats')}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/school_team.jpg"
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-brand-darker/95" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red-950/20 via-transparent to-brand-red-950/20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              The <span className="gold-gradient">Numbers</span> Speak
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { end: 1, prefix: '1:', suffix: '9', label: 'Teacher-Student Ratio', isRatio: true },
              { end: 100, suffix: '%', label: 'College Placement Rate' },
              { end: 30, suffix: '+', label: 'Sports & Club Programs' },
              { end: 8, suffix: ' Acres', label: 'State-of-Art Campus' }
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center space-y-2 ${
                  visibleSections['stats'] ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-brand-gold-500 font-display">
                  {stat.isRatio ? (
                    <span>1:9</span>
                  ) : (
                    <AnimatedCounter end={stat.end} suffix={stat.suffix || ''} prefix={stat.prefix || ''} />
                  )}
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-wider text-gray-400 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CAMPUS GALLERY ========== */}
      <section
        id="campus"
        ref={setSectionRef('campus')}
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Explore Our Campus</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Campus & <span className="gold-gradient">Infrastructure</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base font-light">
            An inspiring environment built to motivate students to pursue active learning.
          </p>
        </div>

        {/* Featured Large Image + 2 Small */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div
            className={`glass-card-premium rounded-xl overflow-hidden group row-span-2 ${
              visibleSections['campus'] ? 'animate-slide-in-left' : 'opacity-0'
            }`}
          >
            <div className="relative h-64 lg:h-full min-h-[320px] overflow-hidden">
              <img
                src="/school_campus_main.jpg"
                alt="Vasant Valley School Campus"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-[10px] uppercase font-bold text-brand-gold-500 bg-brand-red-950/80 border border-brand-red-900/30 px-3 py-1 rounded-full backdrop-blur-sm">Featured</span>
                <h3 className="text-2xl font-bold text-white">Main School Campus</h3>
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  Our beautiful eight-acre main campus features modern classrooms, interactive lecture halls, and lush green lawns designed for optimal learning.
                </p>
              </div>
            </div>
          </div>

          {campusHighlights.slice(1, 3).map((item, index) => (
            <div
              key={index}
              className={`glass-card-premium rounded-xl overflow-hidden group ${
                visibleSections['campus'] ? 'animate-slide-in-right' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-darker/80 hidden sm:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darker to-transparent sm:hidden" />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center space-y-2">
                  <span className="text-[9px] uppercase font-bold text-brand-gold-500 bg-brand-red-950 border border-brand-red-900/30 px-2 py-0.5 rounded w-fit">{item.category}</span>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {campusHighlights.slice(3).map((item, index) => (
            <div
              key={index}
              className={`glass-card-premium rounded-xl overflow-hidden group ${
                visibleSections['campus'] ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/40 to-transparent" />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase font-bold text-brand-gold-500 bg-brand-red-950 border border-brand-red-900/30 px-2 py-0.5 rounded">{item.category}</span>
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View Gallery Link */}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center space-x-2 text-brand-gold-500 hover:text-brand-gold-400 font-semibold text-sm group transition-colors"
          >
            <span>View Complete Gallery</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ========== ANNOUNCEMENTS ========== */}
      <section
        id="announcements"
        ref={setSectionRef('announcements')}
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Stay Updated</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
              Announcements & News
            </h2>
          </div>
          <Link
            to="/portal"
            className="text-sm font-semibold text-brand-gold-500 hover:text-brand-gold-600 flex items-center space-x-1 hover:underline group"
          >
            <span>Log in to portal</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {notices.map((n, index) => (
              <GlassCard
                key={n._id}
                className={`relative flex flex-col justify-between ${
                  visibleSections['announcements'] ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                hoverEffect={true}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded ${
                      n.priority === 'high'
                        ? 'bg-red-950/80 text-red-400 border border-red-500/20'
                        : 'bg-brand-red-950/80 text-brand-gold-500 border border-brand-red-900/30'
                    }`}>
                      {n.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white hover:text-brand-gold-500 transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    {n.content}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                  <span>Issued by: {n.createdBy}</span>
                  <Link to="/news-events" className="text-brand-gold-500 hover:text-brand-gold-400 font-semibold flex items-center space-x-1">
                    <span>Read more</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section
        id="testimonials"
        ref={setSectionRef('testimonials')}
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/hero_library.jpg"
            alt=""
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-brand-darker/95" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">What People Say</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Parent & Alumni <span className="gold-gradient">Testimonials</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-card-premium rounded-2xl p-8 sm:p-12 text-center relative">
              {/* Quote Icon */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-red-900 border border-brand-red-800/50 p-3 rounded-xl shadow-xl">
                <Quote className="h-6 w-6 text-brand-gold-500" />
              </div>

              {/* Stars */}
              <div className="flex justify-center space-x-1 mb-6 pt-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-brand-gold-500 fill-brand-gold-500" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light italic mb-8">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              {/* Author */}
              <div className="space-y-1">
                <div className="text-white font-bold text-base">{testimonials[currentTestimonial].name}</div>
                <div className="text-brand-gold-500 text-sm font-semibold">{testimonials[currentTestimonial].role}</div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-brand-gold-500/30 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentTestimonial === index
                          ? 'w-8 bg-brand-gold-500'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-brand-gold-500/30 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ACADEMIC HIGHLIGHTS ========== */}
      <section
        id="academics-preview"
        ref={setSectionRef('academics-preview')}
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Academic Programs</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Curriculum <span className="gold-gradient">Overview</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Junior School',
              subtitle: 'Nursery - Grade V',
              description: 'Foundational numeracy, language acquisition, creative arts, and environmental awareness through inquiry-based and experiential learning.',
              image: '/school_playground.jpg',
              highlights: ['Phonics', 'Art & Expression', 'Nature Studies']
            },
            {
              title: 'Middle School',
              subtitle: 'Grade VI - VIII',
              description: 'Complex disciplines in sciences, history, computer programming, and secondary languages with collaborative lab work.',
              image: '/school_science_lab_new.jpg',
              highlights: ['Science Labs', 'Coding', 'Algebra']
            },
            {
              title: 'Senior School',
              subtitle: 'Grade IX - XII',
              description: 'CBSE and Cambridge IGCSE / A-Levels preparation with advanced calculus, physics, and college placement guidance.',
              image: '/school_education.jpg',
              highlights: ['IGCSE', 'A-Levels', 'Career Counseling']
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`glass-card-premium rounded-xl overflow-hidden group ${
                visibleSections['academics-preview'] ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-brand-gold-500 font-semibold">{item.subtitle}</p>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-sm text-gray-400 font-light leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] font-semibold text-brand-gold-500 bg-brand-gold-500/10 border border-brand-gold-500/20 px-2.5 py-1 rounded-full">
                      {h}
                    </span>
                  ))}
                </div>
                <Link
                  to="/academics"
                  className="inline-flex items-center space-x-1 text-brand-gold-500 hover:text-brand-gold-400 text-xs font-semibold group/link"
                >
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="/school_auditorium.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-red-900/95 via-brand-red-900/85 to-brand-red-800/75" />
          </div>

          {/* Content */}
          <div className="relative z-10 py-16 px-8 sm:px-12 md:flex md:items-center md:justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-white">
                Experience Vasant Valley Digitally
              </h2>
              <p className="text-gray-200 text-sm sm:text-base font-light leading-relaxed">
                Plan a campus visit or navigate our interactive facilities, sports grounds, modern design labs, and academic classrooms online.
              </p>
            </div>

            <div className="mt-8 md:mt-0 flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                to="/admissions"
                className="inline-block bg-white hover:bg-gray-100 text-brand-red-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm uppercase tracking-wider text-center btn-press"
              >
                Schedule Visit
              </Link>
              <Link
                to="/contact"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl transition-all text-sm uppercase tracking-wider text-center btn-press"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEWS EVENTS PREVIEW ========== */}
      <section
        id="news-preview"
        ref={setSectionRef('news-preview')}
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Latest Updates</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
              Recent <span className="gold-gradient">News</span>
            </h2>
          </div>
          <Link
            to="/news-events"
            className="text-sm font-semibold text-brand-gold-500 hover:text-brand-gold-600 flex items-center space-x-1 hover:underline group"
          >
            <span>View all news</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              image: '/school_sports_track.jpg',
              category: 'Sports',
              title: 'Delhi State Open Summer Athletics Championships',
              date: 'June 2026',
              description: 'Our students excelled in athletics, bringing home multiple medals.'
            },
            {
              image: '/school_education.jpg',
              category: 'Academics',
              title: 'CBSE Class XII 2026 Results',
              date: 'May 2026',
              description: 'Outstanding results in CBSE Board Examinations 2026.'
            },
            {
              image: '/school_computer_lab.jpg',
              category: 'Technology',
              title: 'AI Bootcamp & Innovation Showcase',
              date: 'February 2026',
              description: 'Students showcased innovative projects at the Global AI Summit.'
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`glass-card-premium rounded-xl overflow-hidden group ${
                visibleSections['news-preview'] ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase font-bold text-brand-gold-500 bg-brand-red-950/80 border border-brand-red-900/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-brand-gold-500 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== FOOTER SPACER ========== */}
      <div className="h-1" />
    </div>
  );
};

export default Home;

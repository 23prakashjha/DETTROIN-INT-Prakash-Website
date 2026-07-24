import React, { useState, useEffect, useCallback } from 'react';
import GlassCard from '../components/GlassCard';
import { GalleryCardSkeleton } from '../components/Skeleton';
import { Camera, X, ChevronLeft, ChevronRight, Grid, LayoutGrid } from 'lucide-react';

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [layout, setLayout] = useState('grid');
  const [visibleItems, setVisibleItems] = useState(false);

  const galleryItems = [
    {
      title: 'Main Campus Exterior',
      category: 'Campus',
      src: '/school_campus_main.jpg',
      description: 'The elegant architecture of Vasant Valley School showcasing clean structures and green spaces across eight acres.',
      featured: true
    },
    {
      title: 'Science & Research Lab',
      category: 'Labs',
      src: '/school_science_lab_new.jpg',
      description: 'Senior students performing molecular chemistry testing using advanced lab instrumentation.',
      featured: true
    },
    {
      title: 'Synthetic Sports Field',
      category: 'Sports',
      src: '/school_sports_new.jpg',
      description: 'Our certified all-weather soccer field and running track during a competitive practice session.',
      featured: false
    },
    {
      title: 'Central Library',
      category: 'Academics',
      src: '/school_library.jpg',
      description: 'The well-stocked library with thousands of volumes, international journals, and digital resources.',
      featured: true
    },
    {
      title: 'Computer Laboratory',
      category: 'Labs',
      src: '/school_computer_lab.jpg',
      description: 'Advanced computer labs with high-speed internet and latest software for digital learning.',
      featured: false
    },
    {
      title: 'Basketball Courts',
      category: 'Sports',
      src: '/school_basketball.jpg',
      description: 'Students competing in the inter-house basketball tournament on our synthetic courts.',
      featured: false
    },
    {
      title: 'Art Studio',
      category: 'Arts',
      src: '/school_art_studio.jpg',
      description: 'Dedicated art studios for painting, sculpture, and creative expression with professional easels.',
      featured: false
    },
    {
      title: 'Music & Dance Room',
      category: 'Arts',
      src: '/school_music_room.jpg',
      description: 'Soundproofed rooms with professional equipment for musical and performing arts education.',
      featured: false
    },
    {
      title: 'Interactive Classrooms',
      category: 'Academics',
      src: '/school_classroom_new.jpg',
      description: 'Modern classrooms equipped with smart boards and interactive learning technology.',
      featured: false
    },
    {
      title: 'Sports Track',
      category: 'Sports',
      src: '/school_sports_track.jpg',
      description: 'Synthetic running tracks designed for professional-level athletic training.',
      featured: false
    },
    {
      title: 'Student Life',
      category: 'Campus',
      src: '/school_students.jpg',
      description: 'Students engaging in collaborative learning and building lifelong friendships.',
      featured: false
    },
    {
      title: 'Reading & Study Areas',
      category: 'Academics',
      src: '/school_reading.jpg',
      description: 'Quiet study zones and reading corners designed for focused learning.',
      featured: false
    },
    {
      title: 'Teaching Excellence',
      category: 'Campus',
      src: '/school_teaching.jpg',
      description: 'Our dedicated faculty providing personalized attention to every student.',
      featured: false
    },
    {
      title: 'Books & Resources',
      category: 'Academics',
      src: '/school_books.jpg',
      description: 'An extensive collection of academic resources and reference materials.',
      featured: false
    },
    {
      title: 'Playground Area',
      category: 'Sports',
      src: '/school_playground.jpg',
      description: 'Safe and exciting play areas for younger students to explore and grow.',
      featured: false
    },
    {
      title: 'Education & Innovation',
      category: 'Campus',
      src: '/school_education.jpg',
      description: 'Where traditional values meet modern educational methodologies.',
      featured: false
    },
    {
      title: 'University Partnerships',
      category: 'Academics',
      src: '/school_university.jpg',
      description: 'Our students gain admission to top universities worldwide through dedicated counseling.',
      featured: false
    },
    {
      title: 'Team Activities',
      category: 'Sports',
      src: '/school_team.jpg',
      description: 'Students building teamwork and leadership skills through collaborative sports programs.',
      featured: false
    }
  ];

  const categories = ['All', 'Campus', 'Academics', 'Labs', 'Sports', 'Arts'];

  const filteredItems = filter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  const handleFilterChange = (newFilter) => {
    setLoading(true);
    setVisibleItems(false);
    setFilter(newFilter);
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => setVisibleItems(true), 50);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => setVisibleItems(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const openLightbox = (index) => {
    setLightbox({ open: true, index });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox({ open: false, index: 0 });
    document.body.style.overflow = '';
  };

  const navigateLightbox = useCallback((direction) => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + direction + filteredItems.length) % filteredItems.length
    }));
  }, [filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.open) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.open, navigateLightbox]);

  return (
    <div className="pt-32 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-4" aria-labelledby="gallery-heading">
        <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold-500">Visual Tour</span>
        <h1 id="gallery-heading" className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          School <span className="gold-gradient">Gallery</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light text-sm sm:text-base">
          A glimpse into campus life, scientific testing, competitive athletics, and creative arts.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex justify-center items-center gap-8 text-center">
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-brand-gold-500 font-display">{galleryItems.length}</div>
          <div className="text-[10px] uppercase font-semibold tracking-wider text-gray-400">Photos</div>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-brand-gold-500 font-display">{categories.length - 1}</div>
          <div className="text-[10px] uppercase font-semibold tracking-wider text-gray-400">Categories</div>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-brand-gold-500 font-display">8</div>
          <div className="text-[10px] uppercase font-semibold tracking-wider text-gray-400">Acres</div>
        </div>
      </div>

      {/* Filter & Layout Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/5 pb-6" role="tablist" aria-label="Gallery categories">
        <div className="flex flex-wrap justify-center items-center gap-2" role="tablist">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => handleFilterChange(c)}
              role="tab"
              aria-selected={filter === c}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                filter === c
                  ? 'bg-gradient-to-r from-brand-red-600 to-brand-red-800 text-white shadow-lg shadow-brand-red-950/50 border border-brand-red-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {c}
              {c !== 'All' && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  ({galleryItems.filter(item => item.category === c).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setLayout('grid')}
            className={`p-2 rounded-lg transition-all ${
              layout === 'grid' ? 'bg-brand-red-800 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Grid layout"
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setLayout('masonry')}
            className={`p-2 rounded-lg transition-all ${
              layout === 'masonry' ? 'bg-brand-red-800 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Masonry layout"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div
        className={
          layout === 'masonry'
            ? 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        }
        role="tabpanel"
      >
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <GalleryCardSkeleton key={i} />
          ))
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className={`group cursor-pointer ${
                layout === 'masonry' ? 'break-inside-avoid' : ''
              } ${visibleItems ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => openLightbox(index)}
            >
              <div className="glass-card-premium rounded-xl overflow-hidden">
                <div className={`relative overflow-hidden ${layout === 'masonry' ? '' : 'h-64'}`}>
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                      layout === 'masonry' ? 'h-auto' : 'h-full'
                    }`}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] uppercase font-bold text-brand-gold-500 bg-brand-red-950/80 border border-brand-red-900/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Featured badge */}
                  {item.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[9px] uppercase font-bold text-white bg-brand-gold-500/90 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Camera icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-brand-red-900/80 border border-brand-red-700/50 p-3 rounded-full backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Camera className="h-6 w-6 text-brand-gold-500" />
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-white group-hover:text-brand-gold-500 transition-colors">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* No results message */}
      {!loading && filteredItems.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <Camera className="h-12 w-12 text-gray-600 mx-auto" />
          <p className="text-gray-400 text-sm font-light">No photos found in this category.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-[100] lightbox-overlay flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors z-50 bg-white/10 p-2 rounded-full backdrop-blur-sm"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            className="absolute left-2 sm:left-6 text-white/70 hover:text-white transition-colors z-50 bg-white/10 p-2 sm:p-3 rounded-full backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            className="absolute right-2 sm:right-6 text-white/70 hover:text-white transition-colors z-50 bg-white/10 p-2 sm:p-3 rounded-full backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image Content */}
          <div
            className="max-w-5xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src={filteredItems[lightbox.index].src}
                alt={filteredItems[lightbox.index].title}
                className="w-full max-h-[70vh] object-contain bg-black/50"
              />
            </div>
            <div className="mt-4 text-center space-y-2">
              <h3 className="text-xl font-bold text-white">{filteredItems[lightbox.index].title}</h3>
              <p className="text-sm text-gray-400 font-light max-w-xl mx-auto">
                {filteredItems[lightbox.index].description}
              </p>
              <div className="flex items-center justify-center space-x-3 pt-2">
                <span className="text-[10px] uppercase font-bold text-brand-gold-500 bg-brand-red-950 border border-brand-red-900/30 px-3 py-1 rounded-full">
                  {filteredItems[lightbox.index].category}
                </span>
                <span className="text-xs text-gray-500">
                  {lightbox.index + 1} / {filteredItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

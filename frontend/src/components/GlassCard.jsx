import React from 'react';

const GlassCard = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div 
      className={`glass-panel rounded-xl p-6 transition-all duration-300 touch-action-manipulation ${
        hoverEffect ? 'hover:border-brand-gold-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-gold-500/5 active:scale-[0.99]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;

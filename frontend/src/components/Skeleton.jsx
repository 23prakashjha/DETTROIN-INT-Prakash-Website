import React from 'react';

const Skeleton = ({ className = '', height = 'h-4', width = 'w-full' }) => {
  return (
    <div 
      className={`skeleton rounded ${height} ${width} ${className}`}
      aria-hidden="true"
    />
  );
};

export const CardSkeleton = () => (
  <div className="glass-panel rounded-xl p-6 space-y-4">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-5/6" />
    <Skeleton className="h-3 w-4/6" />
  </div>
);

export const GalleryCardSkeleton = () => (
  <div className="glass-panel rounded-xl overflow-hidden">
    <Skeleton className="h-64 w-full" />
    <div className="p-6 space-y-2">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  </div>
);

export const TextSkeleton = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} />
    ))}
  </div>
);

export default Skeleton;

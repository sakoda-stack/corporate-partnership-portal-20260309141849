import React from 'react';
import { LOGOS } from '../data/logos';

export const LogoScroller: React.FC = () => {
  // Duplicate logos for infinite scroll effect (2 sets is enough for -50% translation)
  const displayLogos = [...LOGOS, ...LOGOS];

  return (
    <div className="bg-white border-b border-stone-100 py-8 overflow-hidden relative w-full touch-pan-y">
      <div className="flex animate-scroll whitespace-nowrap w-max">
        {displayLogos.map((logo, index) => (
          <div 
            key={`${logo.id}-${index}`} 
            className="inline-flex items-center justify-center mx-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
          >
            <img 
              src={logo.url} 
              alt={logo.name} 
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="ml-3 text-stone-400 font-medium text-sm tracking-wider">{logo.name}</span>
          </div>
        ))}
      </div>
      
      {/* Gradient Overlays for smooth fade */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  );
};

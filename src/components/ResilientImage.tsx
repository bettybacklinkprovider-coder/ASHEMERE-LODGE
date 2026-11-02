import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { BUNDLED_IMAGES } from '../assets/imageRegistry';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

function resolveProductionImageSrc(rawSrc: string): string {
  if (!rawSrc) return BUNDLED_IMAGES.woodlandPavilion;
  if (rawSrc.includes('hero_woodland_pavilion')) return BUNDLED_IMAGES.woodlandPavilion;
  if (rawSrc.includes('estate_cantilever_cliff')) return BUNDLED_IMAGES.cantileverCliff;
  if (rawSrc.includes('estate_courtyard_atrium')) return BUNDLED_IMAGES.courtyardAtrium;
  if (rawSrc.includes('estate_alpine_monolith')) return BUNDLED_IMAGES.alpineMonolith;
  if (rawSrc.startsWith('/src/assets/images/')) {
    return rawSrc.replace('/src/assets/images/', '/assets/images/');
  }
  return rawSrc;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Architectural Monograph Asset',
  fallbackSubtitle = 'Obsidian Sanctuary Archive',
}) => {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = resolveProductionImageSrc(src);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-[#141414] border border-white/[0.08] p-8 text-center overflow-hidden ${className}`}
        role="img"
        aria-label={alt}
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 60%, rgba(242, 179, 107, 0.16) 0%, rgba(15, 15, 15, 0.95) 75%)',
          }}
        />
        <Compass className="w-8 h-8 text-[#F2B36B]/70 mb-4 stroke-[1]" />
        <p className="font-display text-lg text-[#FFFFFF] font-light tracking-tight mb-1">
          {fallbackTitle}
        </p>
        <p className="type-label-sm text-[#9E9E9E]">{fallbackSubtitle}</p>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

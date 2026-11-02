import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Architectural Monograph Asset',
  fallbackSubtitle = 'Obsidian Sanctuary Archive',
}) => {
  const [hasError, setHasError] = useState(false);

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
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

 'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  alt: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Avatar({
  src,
  alt,
  initials = '?',
  size = 'md',
  className = '',
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-lg',
  };

  const imageSizes = {
    sm: '32px',
    md: '48px',
    lg: '64px',
  };

  if (src && !imageFailed) {
    return (
      <div className={cn('relative overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-soft)]', sizeClasses[size], className)}>
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes={imageSizes[size]}
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn('flex items-center justify-center rounded-full bg-primary text-white font-semibold', sizeClasses[size], className)}
    >
      {initials}
    </div>
  );
}

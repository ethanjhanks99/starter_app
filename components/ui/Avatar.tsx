import Image from 'next/image';

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
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-lg',
  };

  if (src) {
    return (
      <div className={`relative rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 ${sizeClasses[size]} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-primary text-white font-semibold ${sizeClasses[size]} ${className}`}
    >
      {initials}
    </div>
  );
}

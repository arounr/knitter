'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaHeart, FaLock, FaGlobe } from 'react-icons/fa';
import FormattedDate from './formatted-date';

interface PatternCardProps {
  id: number;
  title: string;
  author?: string;
  imageUrl?: string;
  date: string;
  likes: number;
  isPublic?: boolean;
}

export default function PatternCard({
  id,
  title,
  author,
  imageUrl,
  date,
  likes,
  isPublic,
}: PatternCardProps) {
  const router = useRouter();

  const handleAuthorClick = (event: React.MouseEvent) => {
    // Prevent the click event from bubbling up to the card
    event.stopPropagation();
    if (author) {
      router.push(`/user/${author}`);
    }
  };

  const handleCardClick = () => {
    // Navigate to the pattern detail page
    router.push(`/pattern/${id}`);
  };

  return (
    <div
      onClick={handleCardClick} // Attach navigation to the card click
      className="w-40 h-56 p-4 bg-[var(--color-background)] shadow-md rounded-lg flex flex-col justify-between relative overflow-hidden cursor-pointer"
      style={{ color: 'var(--color-text-primary)' }}
    >
      {isPublic !== undefined && (
        <div
          className="absolute top-2 right-2 rounded-full p-1 text-white z-10"
          style={{
            backgroundColor: isPublic
              ? 'var(--color-success)'
              : 'var(--color-error)',
            color: 'white',
          }}
        >
          {isPublic ? <FaGlobe title="Public" /> : <FaLock title="Private" />}
        </div>
      )}

      <div className="w-full h-32 overflow-hidden flex items-center justify-center relative z-0">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={`${title} pattern`}
              fill
              style={{
                objectFit: 'contain',
                borderRadius: 'inherit',
                imageRendering: 'pixelated',
              }}
              unoptimized
            />
          </div>
        ) : (
          <div className="text-gray-500">No Image Available</div>
        )}
      </div>

      <h3
        className="text-center font-medium mt-2 truncate"
        style={{
          color: 'var(--color-text-primary)',
          fontSize: `clamp(0.8rem, ${12 / title.length}rem, 1.2rem)`,
          lineHeight: '1.2',
          padding: '0.1em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </h3>

      {/* Clickable author name without interfering with the card click */}
      {author && (
        <p
          className="text-sm text-center mb-2"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          by{' '}
          <span
            onClick={handleAuthorClick}
            className="underline hover:text-blue-600 cursor-pointer"
          >
            {author}
          </span>
        </p>
      )}

      <div
        className="flex justify-between items-center text-xs mt-2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {/* Use FormattedDate component to render the date */}
        <FormattedDate dateString={date} />
        <div className="flex items-center">
          <FaHeart className="mr-1 text-red-500" /> {likes}
        </div>
      </div>
    </div>
  );
}

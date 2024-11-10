import Image from 'next/image';
import { FaHeart, FaLock, FaGlobe } from 'react-icons/fa';

interface PatternCardProps {
  title: string;
  author?: string;
  imageUrl?: string;
  date: string;
  likes: number;
  onClick: () => void;
  isPublic?: boolean; // New optional prop to indicate public/private status
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export default function PatternCard({
  title,
  author,
  imageUrl,
  date,
  likes,
  onClick,
  isPublic,
}: PatternCardProps) {
  return (
    <div
      onClick={onClick}
      className="w-40 h-56 p-4 bg-[var(--color-background)] shadow-md rounded-lg flex flex-col justify-between relative overflow-hidden cursor-pointer"
      style={{ color: 'var(--color-text-primary)' }}
    >
      {/* Public/Private Icon Indicator */}
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

      {/* Image */}
      <div className="w-full h-32 overflow-hidden flex items-center justify-center relative z-0">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={`${title} pattern`}
              fill
              style={{
                objectFit: 'contain',
                borderRadius: 'inherit', // Inherit the border radius from parent
                imageRendering: 'pixelated',
              }}
              unoptimized
            />
          </div>
        ) : (
          <div className="text-gray-500">No Image Available</div>
        )}
      </div>

      {/* Title */}
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

      {/* Conditionally render Author */}
      {author && (
        <p
          className="text-sm text-center mb-2"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          by {author}
        </p>
      )}

      {/* Footer with Date and Likes */}
      <div
        className="flex justify-between items-center text-xs mt-2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <p>{formatDate(date)}</p>
        <div className="flex items-center">
          <FaHeart className="mr-1 text-red-500" /> {likes}
        </div>
      </div>
    </div>
  );
}

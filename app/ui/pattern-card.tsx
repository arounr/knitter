// ui/pattern-card.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaHeart, FaLock, FaGlobe } from 'react-icons/fa';
import FormattedDate from './formatted-date';

interface PatternCardProps {
  id: string; // Adjusted to number as per your old implementation
  title: string;
  author?: string;
  imageUrl?: string;
  date: string;
  likes: number;
  isPublic?: boolean;
  showPublicStatus?: boolean; // New prop to control public status display
}

const PatternCard: React.FC<PatternCardProps> = ({
  id,
  title,
  author,
  imageUrl,
  date,
  likes,
  isPublic,
  showPublicStatus = true, // Defaults to true
}) => {
  const router = useRouter();

  /**
   * Handles the card click event.
   * Navigates to the pattern's detail page.
   */
  const handleCardClick = () => {
    router.push(`/pattern/${id}`);
  };

  /**
   * Handles the author name click event.
   * Navigates to the author's page.
   * Prevents the event from bubbling up to the card click handler.
   *
   * @param event - The mouse click event
   */
  const handleAuthorClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents triggering the card's onClick
    if (author) {
      router.push(`/user/${author}`);
    }
  };

  return (
    <div
      onClick={handleCardClick} // Attach navigation to the card click
      className="w-40 h-56 p-4 bg-[var(--color-background)] shadow-md rounded-lg flex flex-col justify-between relative overflow-hidden cursor-pointer"
      style={{ color: 'var(--color-text-primary)' }}
    >
      {/* Conditional Rendering of Public/Private Status */}
      {showPublicStatus && isPublic !== undefined && (
        <div
          className="absolute top-2 right-2 rounded-full p-1 text-white z-10"
          style={{
            backgroundColor: isPublic
              ? 'var(--color-success)' // Color for Public
              : 'var(--color-error)', // Color for Private
            color: 'white',
          }}
        >
          {isPublic ? <FaGlobe title="Public" /> : <FaLock title="Private" />}
        </div>
      )}

      {/* Image Section */}
      <div className="w-full h-32 overflow-hidden flex items-center justify-center relative z-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={96}
            height={96}
            style={{
              objectFit: 'contain',
              imageRendering: 'pixelated',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            unoptimized
          />
        ) : (
          <div className="text-gray-500">No Image Available</div>
        )}
      </div>

      {/* Title Section */}
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

      {/* Author Section */}
      {author && (
        <p
          className="text-sm text-center mb-2"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          by{' '}
          <span
            onClick={handleAuthorClick} // Attach navigation to author click
            className="underline hover:text-blue-600 cursor-pointer"
          >
            {author}
          </span>
        </p>
      )}

      {/* Date and Likes Section */}
      <div
        className="flex justify-between items-center text-xs mt-2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {/* Render the formatted date */}
        <FormattedDate dateString={date} />
        {/* Display the number of likes with a heart icon */}
        <div className="flex items-center">
          <FaHeart className="mr-1 text-red-500" /> {likes}
        </div>
      </div>
    </div>
  );
};

export default PatternCard;

'use client';

import { likeUnlikePattern } from '@/(main)/pattern/[id]/action';
import { useState, useTransition } from 'react';
import { FaHeart } from 'react-icons/fa';

interface LikeButtonProps {
  initialLikeCount: number;
  patternId: string;
  initialIsLiked: boolean;
  disabled?: boolean;
}

export default function LikeButton({
  initialLikeCount,
  patternId,
  initialIsLiked,
  disabled = false,
}: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isPending, startTransition] = useTransition();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLikeToggle = () => {
    if (disabled) return;

    setLikeCount(likeCount + (isLiked ? -1 : 1));
    setIsLiked(!isLiked);
    setIsAnimating(true);

    startTransition(async () => {
      const result = await likeUnlikePattern(patternId);

      // Check for an error in the result
      if ('error' in result) {
        setLikeCount(likeCount + (isLiked ? 1 : 0));
        setIsLiked(isLiked);
        console.error('Error toggling like status:', result.error);
      }

      // Stop animation after a delay
      setTimeout(() => setIsAnimating(false), 300);
    });
  };

  return (
    <button
      onClick={handleLikeToggle}
      className="flex items-center space-x-2 p-2 rounded-full focus:outline-none"
      style={{ cursor: disabled || isPending ? 'not-allowed' : 'pointer' }}
      disabled={disabled || isPending}
    >
      <FaHeart
        className={`text-red-500 ${isAnimating ? 'animate-bounce' : ''}`}
        style={{ fontSize: '1.5rem', color: isLiked ? 'red' : 'gray' }}
      />
      <span style={{ color: 'var(--color-text-primary)', fontSize: '1rem' }}>
        {likeCount} {'Likes'}
      </span>
    </button>
  );
}

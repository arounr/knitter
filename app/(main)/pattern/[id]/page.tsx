import ErrorMessage from '@/ui/error-message';
import { getPatternById } from './action';
import Image from 'next/image';
import LikeButton from '@/ui/like-button';
import { User } from '@/types/user';
import { getProfile } from '@/(main)/profile/action';

interface PatternPageProps {
  params: { id: string };
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};

export default async function PatternPage({ params }: PatternPageProps) {
  const { id } = await params;

  // Fetch pattern data from the server
  const patternData = await getPatternById(id);

  // Handle errors
  if ('error' in patternData) {
    return (
      <ErrorMessage
        headerTitle="Error Loading Pattern"
        message={patternData.error}
      />
    );
  }

  // Fetch profile data and determine if the like button should be disabled
  const profile = (await getProfile()) as User;
  const isLikeButtonDisabled = 'error' in profile;
  const isPatternLiked =
    !isLikeButtonDisabled &&
    profile.likedPatternIds.some((num) => num.toString().includes(id));

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[var(--color-card-bg)] shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2 h-80 bg-[var(--color-card-bg)] rounded-xl overflow-hidden flex items-center justify-center">
          {patternData.imageUrl ? (
            <Image
              src={patternData.imageUrl}
              alt={`${patternData.title} pattern`}
              width={400}
              height={400}
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

        {/* Information Section */}
        <div className="mt-6 md:mt-0 md:ml-8 flex-grow">
          <h1
            className="text-3xl font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {patternData.title}
          </h1>
          <p
            className="text-lg mt-2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Created by{' '}
            <span className="font-medium">{patternData.ownerUsername}</span>
          </p>

          <LikeButton
            initialLikeCount={patternData.likeCount}
            patternId={patternData.id}
            initialIsLiked={isPatternLiked}
            disabled={isLikeButtonDisabled}
          />

          <p
            className="mt-4 text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <strong>Created on:</strong> {formatDate(patternData.creationDate)}
          </p>
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <strong>Last Modified:</strong>{' '}
            {formatDate(patternData.modificationDate)}
          </p>

          {/* Buttons Section */}
          <div className="mt-4 flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Commit Pattern
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Save to Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

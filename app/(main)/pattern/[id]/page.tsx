import React from 'react';
import ErrorMessage from '@/ui/error-message';
import { getPatternById } from './action';
import Image from 'next/image';
import LikeButton from '@/ui/like-button';
import { User } from '@/types/user';
import { getProfile } from '@/(main)/profile/action';
import { Pattern } from '@/types/pattern';
import Link from 'next/link';
import SaveToLibraryButton from '@/ui/save-pattern-button';
import ShareButtonWithModal from '@/component/share-button';

type PatternPageProps = {
  params: Promise<{ id: string }>;
};

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

const PatternPage = async ({ params }: PatternPageProps) => {
  const { id: patternId } = await params;

  // Fetch pattern data from the server
  const patternResult = await getPatternById(patternId);

  if ('error' in patternResult) {
    return (
      <div
        className={'flex-grow flex flex-col items-center justify-center w-full'}
      >
        <ErrorMessage
          headerTitle="Error Viewing Pattern"
          message={patternResult.error}
        />
      </div>
    );
  }

  const patternData = patternResult.data as Pattern;

  const profileResult = await getProfile();

  // if logged in
  let profile;
  let isOwner;
  let isCollaborator;
  let isPatternLiked;
  if ('data' in profileResult) {
    profile = profileResult.data as User;
    isOwner = profile.username === patternData.ownerUsername;
    isCollaborator = patternData.collaboratorNames.includes(profile.username);

    isPatternLiked = profile.likedPatternIds
      .map((id) => id.toString())
      .includes(patternId);
  }

  return (
    <div
      className={'flex-grow flex flex-col items-center justify-center w-full'}
    >
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
              initialIsLiked={isPatternLiked || false}
              disabled={!profile}
            />

            {/* Share Button for Owners */}
            {isOwner && <ShareButtonWithModal patternId={patternId} />}

            <p
              className="mt-4 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <strong>Created on:</strong>{' '}
              {formatDate(patternData.creationDate)}
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
              {isOwner || isCollaborator ? (
                <Link
                  href={`/pattern/edit/${patternId}`}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-center"
                >
                  Edit Pattern
                </Link>
              ) : (
                profile && <SaveToLibraryButton patternId={patternId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternPage;

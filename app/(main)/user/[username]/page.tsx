import Image from 'next/image';
import PatternCard from '@/ui/pattern-card';
import ErrorMessage from '@/ui/error-message';
import { getUser, getUserPatterns } from './action';
import { Pattern } from '@/types/pattern';
import FormattedDate from '@/ui/formatted-date';
import Link from 'next/link';

interface UserPageProps {
  params: { username: string };
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;

  const userData = await getUser(username);

  if ('error' in userData) {
    return (
      <div
        className={'flex-grow flex flex-col items-center justify-center w-full'}
      >
        <ErrorMessage
          headerTitle="Error Loading User"
          message={userData.error}
        />
      </div>
    );
  }

  const userPatterns = (await getUserPatterns(username, 6)) as Pattern[];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[var(--color-background)]">
      {/* User Profile Header */}
      <div className="flex items-center bg-[var(--color-card-bg)] p-6 rounded-lg shadow-md mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={
              userData.profilePicture ||
              'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'
            }
            alt="Profile Picture"
            width={96}
            height={96}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="ml-6">
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            {userData.username}
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Joined <FormattedDate dateString={userData.joinDate} />
          </p>
        </div>
      </div>

      {/* Patterns Section */}
      <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-4">
        Top Patterns by {userData.username}
      </h2>

      {userPatterns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPatterns.map((pattern) => (
            <div
              key={pattern.id}
              className="p-4 rounded-lg bg-[var(--color-input-bg)] shadow-md"
            >
              <PatternCard
                id={pattern.id}
                title={pattern.title}
                author={pattern.ownerUsername}
                imageUrl={pattern.imageUrl}
                date={pattern.creationDate}
                likes={pattern.likeCount}
                isPublic={undefined} // does not matter
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-[var(--color-input-bg)] p-6 rounded-lg shadow-md">
          <p className="text-[var(--color-text-secondary)] mb-4">
            {userData.username} has not created any patterns yet.
          </p>
          <Link
            href="/catalog"
            className="text-[var(--color-button-bg)] hover:text-[var(--color-button-bg-hover)] underline font-medium"
          >
            View Catalog
          </Link>
        </div>
      )}
    </div>
  );
}

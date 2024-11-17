// pages/library/page.tsx
import Link from 'next/link';
import { getProfile } from '../profile/action';
import LibraryTabs from '@/component/library-tabs';

const LibraryPage = async () => {
  const profile = await getProfile();

  return 'error' in profile ? (
    <div className="flex-grow flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center bg-[var(--color-background)]">
        <div className="bg-[var(--color-card-bg)] shadow-lg rounded-lg p-6 text-center max-w-md border border-[var(--color-input-bg)]">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
            Welcome to Your Private Library
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            This library is for logged-in users. Please log in to create and
            manage your collection of patterns.
          </p>
          <Link
            href="/login"
            className="px-5 py-2 bg-[var(--color-button-bg)] text-white rounded-md hover:bg-[var(--color-button-bg-hover)] transition-colors duration-200"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <LibraryTabs />
  );
};

export default LibraryPage;

import PatternContent from '@/ui/pattern-content';
import Link from 'next/link';
import { getProfile } from '../profile/action';

export default async function LibraryPage() {
  const profile = await getProfile();

  // Show login msg
  if (profile.error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="bg-[var(--color-card-bg)] shadow-md rounded-lg p-6 text-center max-w-md border border-[var(--color-input-bg)]">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
            Welcome to Your Private Library
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            This library is for logged-in users. Please log in to create and manage your collection of patterns.
          </p>
          <Link href="/login" className="px-5 py-2 bg-[var(--color-button-bg)] text-white rounded-md hover:bg-[var(--color-button-bg-hover)]">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>

      <PatternContent profile={profile} />
    </>
  );
}

'use client';

import { useRouter } from 'next/navigation';

interface ErrorMessageProps {
  headerTitle: string;
  message: string;
}

export default function ErrorMessage({ headerTitle, message }: ErrorMessageProps) {
  const router = useRouter();

  return (
    <div className="text-center p-4">
      <h1 className="text-4xl font-semibold">{headerTitle}</h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        {message}
      </p>
      <button
        onClick={() => router.back()}
        className="mt-4 inline-block px-4 py-2 bg-[var(--color-button-bg)] text-white rounded-md hover:bg-[var(--color-button-bg-hover)]"
      >
        Go Back
      </button>
    </div>
  );
}
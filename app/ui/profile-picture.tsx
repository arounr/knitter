'use client';

import { uploadProfilePicture } from '@/(main)/profile/action';
import Image from 'next/image';
import { useRef, ChangeEvent, useState } from 'react';

interface ProfilePictureProps {
  profilePicture: string | null;
}

export default function ProfilePicture({
  profilePicture,
}: ProfilePictureProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Check if file size exceeds the 5MB limit
    if (file && file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    setError(null); // Clear any previous errors if file size is acceptable
    if (file) {
      const result = await uploadProfilePicture(file);
      if ('error' in result) {
        setError(result.error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        <Image
          src={
            profilePicture ||
            'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'
          }
          alt="Profile Picture"
          width={96}
          height={96}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white rounded-md"
      >
        Change Profile Picture
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
    </div>
  );
}

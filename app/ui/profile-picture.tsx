'use client';

import { uploadProfilePicture } from '@/(main)/profile/action';
import Image from 'next/image';
import { useRef, ChangeEvent } from 'react';

interface ProfilePictureProps {
  profilePicture?: string;
}

export default function ProfilePicture({ profilePicture }: ProfilePictureProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleProfilePictureUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadProfilePicture(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        <Image
          src={profilePicture || 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'}
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
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={handleProfilePictureUpload}
      />
    </div>
  );
}

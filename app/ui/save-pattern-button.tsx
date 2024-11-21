'use client';

import { saveToLibrary } from '@/(main)/pattern/[id]/action';
import React, { useState } from 'react';

type SaveToLibraryButtonProps = {
  patternId: string;
  onSuccess?: () => void;
};

export default function SaveToLibraryButton({
  patternId,
  onSuccess,
}: SaveToLibraryButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const result = await saveToLibrary(patternId);
      if ('error' in result) {
        setError(result.error);
      } else {
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`px-4 py-2 rounded-md text-white ${
          isSaving ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isSaving ? 'Copying...' : 'Copy to Library'}
      </button>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}

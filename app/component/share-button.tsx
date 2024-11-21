'use client';

import { sharePattern } from '@/(main)/pattern/[id]/action';
import React, { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';

type ShareButtonWithModalProps = {
  patternId: string;
};

const ShareButtonWithModal: React.FC<ShareButtonWithModalProps> = ({
  patternId,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success messages

  const handleShare = async () => {
    setErrorMessage(null); // Reset error message
    setSuccessMessage(null); // Reset success message

    const result = await sharePattern(patternId, username);

    if ('error' in result) {
      setErrorMessage(result.error); // Set the error message if it exists
      return;
    }

    setSuccessMessage(`Successfully sent an invite to "${username}"`); // Set success message
    setUsername(''); // Clear input field
  };

  return (
    <div>
      {/* Share Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-md hover:opacity-90"
        style={{
          backgroundColor: 'var(--color-success)',
          color: 'var(--color-white-text)',
        }}
        onClick={() => {
          setModalOpen(true);
          setErrorMessage(null); // Reset messages when modal opens
          setSuccessMessage(null);
        }}
      >
        <FiShare2 size={20} />
        Share
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="p-6 rounded-lg shadow-lg w-80"
            style={{ backgroundColor: 'var(--color-card-bg)' }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Share Pattern
            </h2>

            {/* Error Message */}
            {errorMessage && (
              <div
                className="mb-4 p-3 rounded-md text-sm"
                style={{
                  backgroundColor: 'var(--color-error)',
                  color: 'var(--color-white-text)',
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div
                className="mb-4 p-3 rounded-md text-sm"
                style={{
                  backgroundColor: 'var(--color-success)',
                  color: 'var(--color-white-text)',
                }}
              >
                {successMessage}
              </div>
            )}

            {/* Input Field */}
            {!successMessage && (
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-md mb-4"
                style={{
                  backgroundColor: 'var(--color-input-bg)',
                  color: 'var(--color-text-primary)',
                }}
              />
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setUsername('');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className="px-4 py-2 rounded-md hover:opacity-90"
                style={{
                  backgroundColor: 'var(--color-button-bg)',
                  color: 'var(--color-white-text)',
                }}
              >
                {successMessage ? 'Close' : 'Cancel'}
              </button>
              {!successMessage && (
                <button
                  onClick={handleShare}
                  className="px-4 py-2 rounded-md hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--color-success)',
                    color: 'var(--color-white-text)',
                  }}
                >
                  Share
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButtonWithModal;

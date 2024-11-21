// components/DeleteButton.tsx
'use client';

import { deletePattern } from '@/(main)/pattern/[id]/action';
import Modal from '@/component/modal';
import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

type DeleteButtonProps = {
  id: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      await deletePattern(id);
      setNotification({
        type: 'success',
        message: 'Pattern deleted successfully.',
      });
      // Optionally, redirect or update UI here
      // For example: window.location.href = '/';
    } catch (error) {
      console.error(error);
      setNotification({
        type: 'error',
        message: 'Failed to delete the pattern. Please try again.',
      });
    } finally {
      setIsProcessing(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 right-4 p-2 rounded-full hover:opacity-90"
        style={{
          backgroundColor: 'var(--color-error)',
          color: 'var(--color-white-text)',
        }}
        aria-label="Delete Pattern"
      >
        <FiTrash2 size={20} />
      </button>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Deletion"
      >
        <p className="mb-4">
          Are you sure you want to delete this pattern? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isProcessing}
            className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </Modal>

      {/* Notification Modal */}
      <Modal
        isOpen={notification !== null}
        onClose={() => setNotification(null)}
        title={notification?.type === 'success' ? 'Success' : 'Error'}
      >
        <p className="mb-4">{notification?.message}</p>
        <div className="flex justify-end">
          <button
            onClick={() => setNotification(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;

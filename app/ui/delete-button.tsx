'use client';

import { deletePattern } from '@/(main)/pattern/[id]/action';
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
type DeleteButtonProps = {
  id: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const handleDelete = async () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this pattern?',
    );
    if (confirmation) {
      try {
        await deletePattern(id);
        alert('Pattern deleted successfully.');
        window.location.href = '/';
      } catch (error) {
        console.error(error);
        alert('Failed to delete the pattern. Please try again.');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="absolute top-4 right-4 p-2 rounded-full hover:opacity-90"
      style={{
        backgroundColor: 'var(--color-error)',
        color: 'var(--color-white-text)',
      }}
      aria-label="Delete Pattern"
    >
      <FiTrash2 size={20} />
    </button>
  );
};

export default DeleteButton;

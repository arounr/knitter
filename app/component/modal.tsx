'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (typeof window === 'undefined') return null; // Ensure compatibility with SSR

  return isOpen
    ? createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            <button onClick={onClose} aria-label="Close Modal">
              <FaTimes size={20} />
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>,
      document.body,
    )
    : null;
};

export default Modal;

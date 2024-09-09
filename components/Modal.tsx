'use client'

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-full max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>
        <div className="mt-4">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;

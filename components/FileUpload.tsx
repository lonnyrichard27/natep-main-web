'use client';

import React from 'react';
import { IoCloudUploadSharp } from 'react-icons/io5';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onRetake: () => void;
  fileName: string | null;
  fileSize: number | null;
  label?: string;
  title?: string;
  pdf?: string;
  accept?: string; // New prop to specify accepted file types
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  onRetake,
  fileName,
  fileSize,
  label = 'Upload file here',
  title,
  pdf = 'PDF',
  accept = 'image/*', // Default to images only
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <>
      <label className="my-5 text-lg">{title}</label>
      <label className="flex items-center justify-between w-full mt-3 p-4 border-2 border-dashed border-primary rounded-lg cursor-pointer">
        <div className="flex items-center">
          <IoCloudUploadSharp className="h-6 w-6 text-primary mr-2" />
          <span className="text-gray-800">{fileName || label}</span>
        </div>
        <span className="text-gray-500">
          {fileSize ? `${fileSize.toFixed(2)} KB` : '0KB'}
        </span>
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
      </label>
      <p className="mt-4 text-sm text-[#667085]">FILE SUPPORT: {pdf}</p>
      <p className="mt-1 text-sm text-[#667085]">MAX FILE SIZE: 2MB</p>

      {fileName && (
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-800">Uploaded File: {fileName}</span>
            <button
              type="button"
              className="text-primary underline"
              onClick={onRetake}
            >
              Retake
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUpload;

import React, { useState } from 'react';
import { IoCloudUploadSharp } from 'react-icons/io5';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  label?: string;
  title?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  label = 'Upload file here',
  title
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size / 1024); // Convert size to KB
      onFileUpload(file);
    }
  };

  return (
    <>
      <label className='my-5 text-lg'>{title}</label>
      <label className="flex items-center justify-between w-full mt-3 p-4 border-2 border-dashed border-primary rounded-lg cursor-pointer">
        <div className="flex items-center">
          <IoCloudUploadSharp className="h-6 w-6 text-primary mr-2" />
          <span className="text-gray-800">{fileName || label}</span>
        </div>
        <span className="text-gray-500">
          {fileSize ? `${fileSize.toFixed(2)} KB` : '0KB'}
        </span>
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
      <p className="mt-4 text-sm text-[#667085]">FILE SUPPORT: PDF</p>
        <p className="mt-1 text-sm text-[#667085]">MAX FILE SIZE: 2MB</p>
    </>
  );
};

export default FileUpload;

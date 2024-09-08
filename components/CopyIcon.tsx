'use client';

import React, { useState } from 'react';
import { BsCopy } from 'react-icons/bs';
interface CopyIconProps {
  textToCopy: string;
  text: string
}

const CopyIcon: React.FC<CopyIconProps> = ({ textToCopy, text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center">
      <button onClick={handleCopy} className="text-primary">
        <BsCopy className="cursor-pointer h-6 w-6 text-[#36BF6D]" />
      </button>
      <p className='ml-3'>{text}</p>
      {copied && <span className="ml-2 text-green-500 text-sm">Copied!</span>}
    </div>
  );
};

export default CopyIcon;

import { downloadSheet } from '@/util/helpers';
import React from 'react';

const ExportSheet = ({ fileCode }: { fileCode: string }) => {
  return (
    <button
      onClick={() => downloadSheet(fileCode)}
      className='rounded-full bg-[#EBF9F0] px-4 py-2 text-sm font-medium text-[#2B9957]'
    >
      Export
    </button>
  );
};

export default ExportSheet;

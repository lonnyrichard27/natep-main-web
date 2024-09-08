'use client';

import React from 'react';

const PageLoader = () => {
  return (
    <div className='flex items-center justify-center bg-white'>
      <div className='relative my-40 h-16 w-16'>
        <div className='absolute inset-0 animate-spin rounded-full border-4 border-gray-300 border-t-primary' />
      </div>
    </div>
  );
};

export default PageLoader;

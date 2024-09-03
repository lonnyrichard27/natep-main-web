import React from 'react';

const Footer = () => {
  return (
    <div className='mt-auto flex items-center justify-between gap-4 bg-[#101828] px-10 py-3.5 text-white'>
      <p className='text-sm font-medium'>
        Terms
        <span className='ml-5 inline-block'>Privacy</span>
      </p>

      <p className='shrink-0 font-light'>
        © 2024 National Talent Export Program
      </p>
    </div>
  );
};

export default Footer;

import React from 'react';

const Footer = () => {
  return (
    <div className='mt-auto flex flex-col items-center justify-between gap-4 bg-[#101828] px-10 py-4 text-sm text-white md:flex-row'>
      <div className='flex items-center gap-10'>
        <span>Terms</span>
        <span>Privacy</span>
      </div>
      <div>&copy; 2024 National Talent Export Program</div>
    </div>
  );
};

export default Footer;

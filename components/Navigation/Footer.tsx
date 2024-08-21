import React from 'react';

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 bg-[#101828] px-4 py-3 text-white">
      <p className="text-sm font-medium">
        Terms
        <span className="inline-block ml-5">Privacy</span>
      </p>

      <p className="shrink-0 font-light">
        © 2024 National Talent Export Program
      </p>
    </div>
  );
};

export default Footer;

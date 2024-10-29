import Link from 'next/link';
import React from 'react';
import { DashboardRoutes } from './Routes';

const Footer = () => {
  return (
    <div className='mt-auto flex flex-col items-center justify-between gap-4 bg-[#101828] px-10 py-4 text-sm text-white md:flex-row'>
      <div className='flex items-center gap-10'>
        <span>Terms</span>
        <Link href={DashboardRoutes.PRIVACY_POLICY}>Privacy</Link>
      </div>
      <div>&copy; 2024 National Talent Export Program</div>
    </div>
  );
};

export default Footer;

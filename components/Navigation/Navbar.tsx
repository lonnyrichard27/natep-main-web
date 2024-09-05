'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import Badge from '../Badge';
import { NtepLogo } from '@/public/assets/images';

const Navbar = () => {
  return (
    <header className='sticky top-0 z-40 flex w-full flex-wrap border border-[#F2F4F7] bg-white py-3 sm:flex-nowrap sm:justify-start'>
      <nav className='mx-auto w-full sm:flex sm:items-center sm:justify-between md:px-8'>
        {/* Brand Logo */}
        <Link href='/' className=''>
          <Image src={NtepLogo} alt='nav logo' width={120} height={64} />
        </Link>

        <div className='mt-5 flex items-center justify-center font-medium sm:mt-0 sm:justify-end sm:ps-5'>
          <ul className='flex items-center md:gap-12'>
            <li>
              <Badge title='Portal' />
            </li>
            <li>
              <Link href='#' className='mx-4'>
                Price List
              </Link>
              <Link href='#' className='mx-4'>
                Contact Us
              </Link>
            </li>
            <li className='flex items-center'>
              <IoCheckmarkCircle className='text-[#2B9957]' />
              <span className='ml-2 text-sm text-[#2B9957]'>Online</span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { NtepLogo } from '@/public/assets/images';
import { DashboardRoutes } from './Routes';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const nav_items = [
    {
      label: 'Portal',
      href: DashboardRoutes.LOGIN,
      checker: ['/dashboard', '/auth'],
    },
    { label: 'Verify', href: DashboardRoutes.VERIFY, checker: ['/verify'] },
    { label: 'Contact Us', href: '#', checker: [''] },
  ];

  return (
    <header className='sticky top-0 z-40 flex w-full flex-wrap border border-[#F2F4F7] bg-white py-3 sm:flex-nowrap sm:justify-start'>
      <nav className='mx-auto w-full sm:flex sm:items-center sm:justify-between md:px-8'>
        {/* Brand Logo */}
        <Link href='/' className=''>
          <Image src={NtepLogo} alt='nav logo' width={120} height={64} />
        </Link>

        <div className='mt-5 flex items-center justify-center font-medium sm:mt-0 sm:justify-end sm:ps-5'>
          <ul className='flex items-center text-sm md:gap-12'>
            {nav_items?.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`${pathname.includes(item.checker[0] || item.checker[1]) ? 'bg-[#EBF9F0] text-primary' : 'text-[#667085]'} rounded-full px-3.5 py-2`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

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

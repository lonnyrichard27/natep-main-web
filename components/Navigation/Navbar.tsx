'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import Badge from '../Badge';

const Navbar = () => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
      <nav className=" w-full mx-auto md:px-8 sm:flex sm:items-center sm:justify-between">
        {/* Brand Logo */}
        <Link href="/" className=''>
          <Image
            src="/images/nteplogo.png"
            alt="nav logo"
            width={150}
            height={150}
            className="md:w-auto object-fit mx-auto"
          />
        </Link>
        <div className="flex items-center mt-5 sm:justify-end justify-center sm:mt-0 sm:ps-5">
          <ul className="flex items-center md:gap-12">
            <li>
              <Badge title="Portal" />
            </li>
            <li>
              <Link href="#" className="md:text-lg mx-4 text-sm">
                Price List
              </Link>
              <Link href="#" className="md:text-lg mx-4 text-sm">
                Contact Us
              </Link>
            </li>
            <li className="flex items-center">
              <IoCheckmarkCircle className="text-[#2B9957]" />
              <span className="text-[#2B9957] text-sm md:text-lg ml-2">Online</span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

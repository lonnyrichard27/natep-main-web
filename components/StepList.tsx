'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface Step {
  title: string;
  subtitle: string;
  icon: ReactNode;
  isCompleted: boolean;
  name?: string;
  link?: string;
}

const StepList = ({ icon, title, subtitle, isCompleted, link }: Step) => {
  return (
    <Link href={link ?? ''}>
      <div className='py-4'>
        <div className={`flex items-center gap-4`}>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-green-800`}
          >
            {icon}
          </div>
          <div className='flex-1'>
            <h3 className='text-lg font-medium text-[#344054]'>{title}</h3>
            <p className='text-sm font-light text-[#667085]'>{subtitle}</p>
          </div>

          {isCompleted ? (
            <IoCheckmarkCircle className='text-2xl text-[#2B9957]' />
          ) : (
            <IoCheckmarkCircle className='text-2xl text-gray-300' />
          )}
        </div>
      </div>
    </Link>
  );
};

export default StepList;

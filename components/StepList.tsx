'use client'

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
      <div className="py-4">
        <div className={`flex items-center gap-4`}>
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full bg-green-800`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg text-[#344054] font-medium">{title}</h3>
            <p className="text-sm text-[#667085] font-light">{subtitle}</p>
          </div>

          {isCompleted ? (
            <IoCheckmarkCircle className="text-[#2B9957] text-2xl" />
          ) : (
            <IoCheckmarkCircle className="text-gray-300 text-2xl" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default StepList;
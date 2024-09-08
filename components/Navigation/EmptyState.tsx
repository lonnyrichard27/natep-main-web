import { EmptyStateSvg } from '@/public/assets/images';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';

const EmptyState = ({
  src = EmptyStateSvg,
  title = 'No record',
  desc = 'No record found!',
}: {
  src?: string | StaticImport;
  title?: string;
  desc?: string;
}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Image src={src} alt='empty state image' />

      <div className='w-80 text-center'>
        <h4 className='mb-2 font-semibold text-[#101828]'>{title}</h4>
        <p className='text-sm font-light text-[#344054]'>{desc}</p>
      </div>
    </div>
  );
};

export default EmptyState;

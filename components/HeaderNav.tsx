import React from 'react';
import BackSvg from './svgs/BackSvg';

interface HeaderNavProps {
  title: string;
  onClick?: () => void;
}

const HeaderNav = ({ title, onClick }: HeaderNavProps) => {
  return (
    <div
      onClick={onClick}
      className='flex w-fit cursor-pointer items-center gap-3'
    >
      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F4F7]'>
        <BackSvg />
      </div>
      <div>
        <p className='text-lg font-semibold text-[#101828]'>{title}</p>
      </div>
    </div>
  );
};

export default HeaderNav;

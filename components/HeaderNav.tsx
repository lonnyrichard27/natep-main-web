import React from 'react';
import BackSvg from './svgs/BackSvg';

interface HeaderNavProps {
  title: string;
  onClick?: () => void;
}

const HeaderNav = ({ title, onClick }: HeaderNavProps) => {
  return (
    <div onClick={onClick} className="flex gap-3 cursor-pointer items-center">
      <div className="bg-[#F2F4F7] h-8 w-8 rounded-full flex items-center justify-center">
        <BackSvg />
      </div>
      <div>
        <p className="text-[#101828] font-bold text-lg">{title}</p>
      </div>
    </div>
  );
};

export default HeaderNav;

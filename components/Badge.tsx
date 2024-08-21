import React from 'react';

interface BadgeProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string; 
}

const Badge = ({ title, leftIcon, rightIcon, bgColor = 'bg-[#EBF9F0]', textColor = 'text-primary', className = '' }: BadgeProps) => {
  return (
    <span
      className={`whitespace-nowrap my-5 md:text-lg text-sm cursor-pointer flex items-center gap-2 rounded-full px-8 py-3 ${bgColor} ${textColor} ${className}`}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {title}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </span>
  );
};

export default Badge;

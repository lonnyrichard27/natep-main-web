import React, { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  width?: string;
  className?: string;
  v_padding?: string;
}

const Wrapper = ({ children, width, className, v_padding }: WrapperProps) => {
  return (
    <div
      className={`mx-auto px-5 lg:px-0 ${
        width || 'max-w-[1400px] lg:w-11/12 xl:w-5/6 3xl:w-4/5'
      } ${className} ${v_padding || 'py-10 md:py-16'}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;

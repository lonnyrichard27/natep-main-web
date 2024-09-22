'use client';

import { FC, ReactNode, useEffect } from 'react';

interface SideDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  children: ReactNode;
}

const SideDrawer: FC<SideDrawerProps> = ({
  isOpen,
  toggleDrawer,
  children,
}) => {
  useEffect(() => {
    // Prevent background from scrolling when the drawer is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className='relative'>
      <div
        className={`slow__trans scrollbar-hide fixed top-0 z-[999] h-full w-[424px] overflow-y-auto whitespace-normal bg-white p-8 ${
          isOpen ? 'right-0' : '-right-[500px]'
        }`}
      >
        {children}
      </div>

      {isOpen && (
        <div
          className='fixed bottom-0 left-0 top-0 z-[888] h-full w-full bg-[#124024]/40 backdrop-blur-sm'
          onClick={toggleDrawer}
        >
          <button
            className={`absolute right-[460px] top-4 z-[1000] w-fit rounded-full border border-white bg-[white]/20 px-6 py-1.5 font-bold text-white`}
            onClick={toggleDrawer}
          >
            X close
          </button>
        </div>
      )}
    </div>
  );
};

export default SideDrawer;

import React from 'react';
import { GoChevronRight } from 'react-icons/go';

const OngoingDeliveries = () => {
  return (
    <div className='flex h-fit flex-col gap-6 rounded-lg border border-[#F2F4F7] p-10'>
      <h2 className='font-semibold'>Ongoing Deliveries</h2>

      <div>
        <h3 className='text-xs font-light text-[#98A2B3]'>
          TUESDAY, 06 DEC 2022
        </h3>
        <hr className='my-4 text-gray-400' />

        <article>
          <div className='flex items-center justify-between'>
            <div>
              <p className='mb-1 text-sm font-semibold text-[#101828]'>
                Consular Services, Germany
              </p>
              <p className='text-xs font-medium text-[#667085]'>
                REF #34928427
              </p>
            </div>
            <span className='text-2xl'>
              <GoChevronRight />
            </span>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OngoingDeliveries;

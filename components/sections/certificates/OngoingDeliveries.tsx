import React from 'react';
import { GoChevronRight } from 'react-icons/go';

const OngoingDeliveries = () => {
  return (
    <div className='flex h-fit flex-col gap-6 rounded-lg border border-[#F2F4F7] p-10'>
      <h2 className='font-semibold'>Ongoing Deliveries</h2>

      <div>
        <p className='text-muted-foreground'>TUESDAY, 06 DEC 2022</p>
        <hr className='my-4 text-gray-400' />
        <article className='flex justify-between'>
          <article>
            <p className='text-xl font-bold'>Consular Services, Germany</p>
            <p>REF #34928427</p>
          </article>
          <article className='flex items-center'>
            <GoChevronRight />
          </article>
        </article>
      </div>
    </div>
  );
};

export default OngoingDeliveries;

import { SideDrawer } from '@/components/elements';
import { DeliveryTypes } from '@/types/DeliveryTypes';
import { getCountryName, getDate } from '@/util/helpers';
import React, { useState } from 'react';
import { GoChevronRight } from 'react-icons/go';

const ViewDelivery = ({ delivery }: { delivery: DeliveryTypes }) => {
  const [isOpen, setisOpen] = useState(false);

  const handleOpen = () => {
    setisOpen(!isOpen);
  };

  const events = [
    {
      title: 'NATEP Headquarters',
      address: '1609 Admiralty Way, WUSE Zone 6',
      date: new Date(),
    },
    {
      title: 'NATEP Headquarters',
      address: '1609 Admiralty Way, WUSE Zone 6',
      date: new Date(),
    },
    {
      title: 'NATEP Headquarters',
      address: '1609 Admiralty Way, WUSE Zone 6',
      date: new Date(),
    },
  ];

  return (
    <div>
      <div
        onClick={handleOpen}
        className='flex cursor-pointer items-center justify-between'
      >
        <div>
          <p className='mb-1 text-sm font-semibold text-[#101828]'>
            {delivery.address}, {getCountryName(delivery.country)}
          </p>
          <p className='text-xs font-medium text-[#667085]'>
            REF {delivery.tracking_ref}
          </p>
        </div>
        <span className='text-2xl text-[#98A2B3]'>
          <GoChevronRight />
        </span>
      </div>

      <SideDrawer isOpen={isOpen} toggleDrawer={handleOpen}>
        <div className='flex h-full flex-col gap-8'>
          <h2 className='font-semibold'>REF {delivery.tracking_ref}</h2>

          <div className='bg-[#F9FAFB] p-4'>
            {events.map((task, index) => (
              <div key={index} className='flex gap-x-3'>
                <div
                  className={`relative ${
                    index === events.length - 1
                      ? ''
                      : 'after:absolute after:bottom-0 after:start-3.5 after:top-7 after:w-px after:-translate-x-[0.5px] after:bg-[#A3E2BC]'
                  }`}
                >
                  <div className='relative z-10 flex h-7 w-7 items-center justify-center'>
                    <div className='h-2 w-2 rounded-full bg-primary'></div>
                  </div>
                </div>

                <div
                  className={`${index !== events?.length - 1 && 'pb-4'} grow pt-0.5`}
                >
                  <article className='mt-[1px] flex justify-between gap-10'>
                    <article className='flex-1 text-sm'>
                      <h3 className='flex gap-x-1.5 font-semibold text-gray-800'>
                        {task.title}
                      </h3>
                      <p className='mt-1 text-[#344054]'>{task.address}</p>
                    </article>

                    <article>
                      <h3 className='text-xs font-light text-[#98A2B3]'>
                        {getDate(task.date)}
                      </h3>
                    </article>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SideDrawer>
    </div>
  );
};

export default ViewDelivery;

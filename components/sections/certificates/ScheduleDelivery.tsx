'use client';

import { CustomButton, SideDrawer } from '@/components/elements';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';
import { getDate } from '@/util/helpers';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ScheduleDelivery = ({
  certificate_id,
}: {
  certificate_id: string | string[];
}) => {
  const { push } = useRouter();

  const [isOpen, setisOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSchedule = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(
        '/delivery/confirm-auto-delivery',
        { certificate_id }
      );
      if (response.status === 200 || response.status === 201) {
        push(DashboardRoutes.VIEW_CERTIFICATES);
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      handleError(error);
    }
  };

  return (
    <div>
      <CustomButton
        text='Schedule Delivery'
        onClick={handleOpen}
        color='text-white'
        className='block w-full py-3'
      />

      <SideDrawer isOpen={isOpen} toggleDrawer={handleOpen}>
        <div className='flex h-full flex-col gap-8'>
          <h2 className='text-lg font-semibold'>Schedule Delivery</h2>

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

          <div className='mt-auto border-t pt-5'>
            <CustomButton
              onClick={handleSchedule}
              text={
                isSubmitting ? 'Confirming delivery...' : 'Confirm Delivery'
              }
              className='!bg-primary px-4 py-2 text-[15px]'
              disabled={isSubmitting}
              disabledBgColor='opacity-45'
            />
          </div>
        </div>
      </SideDrawer>
    </div>
  );
};

export default ScheduleDelivery;

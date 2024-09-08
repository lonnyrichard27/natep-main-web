'use client';

import { CustomButton, CustomInput, SideDrawer } from '@/components/elements';
import { pickDateSchema } from '@/schema/certificateSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';
import { useRouter } from 'next/navigation';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { combineDateAndTime } from '@/util/helpers';

const SelectPickupDate = ({
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

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange', resolver: yupResolver(pickDateSchema) });

  const handlePickup = async (data: any) => {
    const pickupLoad = {
      pickup_time: combineDateAndTime(data.selectedDate, data.time),
      certificate_id,
    };

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(
        '/delivery/set-pickup-time',
        pickupLoad
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
        text='Select Pickup Date'
        onClick={handleOpen}
        color='text-[#475467]'
        className='block w-full py-3'
        bgColor='bg-[#F2F4F7]'
      />

      <SideDrawer isOpen={isOpen} toggleDrawer={handleOpen}>
        <form
          onSubmit={handleSubmit(handlePickup)}
          className='flex h-full flex-col gap-8'
        >
          <h2 className='text-lg font-semibold'>Select Pickup Date</h2>

          <Controller
            name='selectedDate'
            control={control}
            render={({ field }) => (
              <Calendar
                className='!border-0'
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            control={control}
            name='time'
            render={({ field }) => (
              <CustomInput
                label='Select Time'
                type='time'
                placeholder='09:00'
                min='08:00'
                max='18:00'
                value={field.value}
                onChange={(date: any) => field.onChange(date)}
                error={errors.time?.message}
              />
            )}
          />

          <div className='mt-auto border-t pt-5'>
            <CustomButton
              type='submit'
              text={isSubmitting ? 'Confirming pickup...' : 'Confirm Pickup'}
              className='!bg-primary px-4 py-2 text-[15px]'
              disabled={isSubmitting || !isValid}
              disabledBgColor='opacity-45'
            />
          </div>
        </form>
      </SideDrawer>
    </div>
  );
};

export default SelectPickupDate;

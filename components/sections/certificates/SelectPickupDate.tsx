'use client';

import {
  CustomButton,
  SelectDropdown,
  SideDrawer,
} from '@/components/elements';
import { pickDateSchema } from '@/schema/certificateSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';
import { combineDateAndTime } from '@/util/helpers';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const SelectPickupDate = ({
  certificate_id,
}: {
  certificate_id: string | string[];
}) => {
  const queryClient = useQueryClient();

  const [isOpen, setisOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => {
    setisOpen(!isOpen);
  };

  const timeOptions = [
    { label: '10:00AM', value: '10:00' },
    { label: '12:00PM', value: '12:00' },
    { label: '2:00PM', value: '14:00' },
  ];

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange', resolver: yupResolver(pickDateSchema) });

  const handlePickup = async (data: any) => {
    const pickupLoad = {
      pickup_time: combineDateAndTime(data.selectedDate, data.time.value),
      certificate_id,
    };

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(
        '/delivery/set-pickup-time',
        pickupLoad
      );
      if (response.status === 200 || response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ['single-certificate'] });
        setIsSubmitting(false);
        handleOpen();
        toast.success('Requested Successfully!');
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
                minDate={new Date()}
              />
            )}
          />

          <Controller
            control={control}
            name='time'
            render={({ field }) => (
              <SelectDropdown
                label='Select Time'
                options={timeOptions}
                error={errors.time?.message}
                required
                {...field}
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

'use client';

import {
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from '@/components/elements';
import { requestDeliverySchema } from '@/schema/certificateSchema';
import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const RequestDeliveryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
  ];

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(requestDeliverySchema),
  });

  const handleRequest = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(
        '/delivery/request-delivery',
        data
      );
      if (response.status === 200 || response.status === 201) {
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      handleError(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRequest)}
      className='flex h-fit flex-col gap-6 rounded-lg border border-[#F2F4F7] p-10'
    >
      <div className='mb-6'>
        <h2 className='font-semibold'>Request Delivery</h2>
        <p className='mt-3 text-sm font-light text-[#344054]'>
          Kindly provide the required details below to fulfill your delivery
          request.
        </p>
      </div>

      <div>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <CustomInput
              label='Relying Party Name'
              placeholder='name@email.com'
              error={errors.name?.message}
              {...field}
            />
          )}
        />
      </div>

      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <CustomInput
            label='Contact Email'
            type='email'
            placeholder='docs@immigration.co.uk'
            error={errors.email?.message}
            {...field}
          />
        )}
      />

      <Controller
        name='phone'
        control={control}
        render={({ field }) => (
          <CustomInput
            label='Contact Phone'
            type='text'
            placeholder='080xxxxxx'
            {...field}
          />
        )}
      />

      <Controller
        name='country'
        control={control}
        render={({ field }) => (
          <CustomSelect label='Country' options={options} {...field} />
        )}
      />

      <Controller
        name='state'
        control={control}
        render={({ field }) => (
          <CustomSelect label='State' options={options} {...field} />
        )}
      />

      <Controller
        name='address'
        control={control}
        render={({ field }) => <CustomTextArea label='Address' {...field} />}
      />

      <CustomButton
        type='submit'
        text={isSubmitting ? 'Requesting...' : 'Continue'}
        className='mt-2 w-full !bg-primary py-2.5'
        disabled={isSubmitting || !isValid}
        disabledBgColor='opacity-45'
      />
    </form>
  );
};

export default RequestDeliveryForm;

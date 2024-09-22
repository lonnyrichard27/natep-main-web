'use client';

import { getCountries, getState } from '@/api/application';
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
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoAlertCircle } from 'react-icons/io5';
import { RxCaretDown } from 'react-icons/rx';

const RequestDeliveryForm = () => {
  const { push } = useRouter();

  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(requestDeliverySchema),
  });

  const country = watch('country');

  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });

  const countryOptions = useMemo(() => {
    return (
      countries?.map((item: any) => ({
        label: item.name,
        value: item.iso2,
      })) || []
    );
  }, [countries]);

  const { data: states } = useQuery({
    queryKey: ['states', country],
    queryFn: () => getState(country),
    enabled: !!country,
  });

  const stateOptions = useMemo(() => {
    return (
      states?.map((item: any) => ({
        value: item.name,
        label: item.name,
      })) || []
    );
  }, [states]);

  const handleRequest = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(
        '/delivery/request-delivery',
        data
      );
      if (response.status === 200 || response.status === 201) {
        const paystack_url = response.data.data;
        push(paystack_url);
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

      <div className='flex flex-col gap-4'>
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

        <div className='flex flex-col gap-4 rounded-lg bg-[#EFF5F9] p-4'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <IoAlertCircle className='text-xl text-[#2B9957]' />
              <h3 className='text-sm font-semibold text-[#1B0E44]'>
                Who is a Relying Party?
              </h3>
            </div>

            <button
              className='flex items-center gap-2 rounded-full bg-white px-3 py-1'
              onClick={() => setShow(!show)}
            >
              <span className='text-xxs font-medium text-[#101828]'>
                {show ? 'Hide' : 'Show'}
              </span>
              <RxCaretDown />
            </button>
          </div>

          {show && (
            <div className='text-xs leading-5'>
              A Relying Party is any institution or organization that needs to
              verify your NATEP Certificate.
            </div>
          )}
        </div>
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
            error={errors.phone?.message}
            {...field}
          />
        )}
      />

      <Controller
        name='country'
        control={control}
        render={({ field }) => (
          <CustomSelect
            label='Country'
            options={countryOptions}
            error={errors.country?.message}
            {...field}
          />
        )}
      />

      <Controller
        name='state'
        control={control}
        render={({ field }) => (
          <CustomSelect
            label='State'
            options={stateOptions}
            error={errors.state?.message}
            {...field}
          />
        )}
      />

      <Controller
        name='address'
        control={control}
        render={({ field }) => (
          <CustomTextArea
            label='Address'
            error={errors.address?.message}
            {...field}
          />
        )}
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

'use client';

import { CustomButton, CustomInput } from '@/components/elements';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { signUpSchema } from '@/schema/authSchema';
import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const page = () => {
  const { push } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'onChange', resolver: yupResolver(signUpSchema) });

  const handleRegister = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(
        '/auth/create-new-account',
        data
      );
      if (response.status === 200 || response.status === 201) {
        const user = response.data.data;
        localStorage.setItem('user_account', JSON.stringify(user));

        push(DashboardRoutes.REGISTER_OTP);
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      handleError(error);
    }
  };

  return (
    <section className='w-96 rounded-lg border bg-white px-6 py-10'>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='flex flex-col gap-6'
      >
        <div>
          <h2 className='font-semibold'>Create Account</h2>
          <p className='mt-2 text-sm font-light'>
            Pease input your NIN and other required fields to continue.
          </p>
        </div>

        <Controller
          control={control}
          name='nin'
          render={({ field }) => (
            <CustomInput
              label='NIN'
              type='text'
              placeholder='123456789'
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <CustomInput
              label='Email Address'
              type='email'
              placeholder='ola@gmail.com'
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='phone'
          render={({ field }) => (
            <CustomInput
              label='Phone Number'
              type='text'
              placeholder='080xxxxxx'
              {...field}
            />
          )}
        />

        <CustomButton
          text='Verify Otp'
          type='submit'
          className='w-full py-3'
          disabled={!isValid || isSubmitting}
        />

        <Link href={DashboardRoutes.LOGIN}>
          <CustomButton
            text='Login'
            className='w-full py-3'
            bgColor='bg-[#F2F4F7]'
            color='text-black'
          />
        </Link>
      </form>
    </section>
  );
};

export default page;

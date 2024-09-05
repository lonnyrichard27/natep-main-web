'use client';

import CustomInput from '@/components/elements/CustomInput';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { handleError } from '@/util/errorHandler';
import axiosInstance from '@/util/axios';
import { useState } from 'react';
import { loginSchema } from '@/schema/authSchema';
import { CustomButton } from '@/components/elements';

const page = () => {
  const { push } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange', resolver: yupResolver(loginSchema) });

  const handleLogin = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/auth/email-access', data);
      if (response.status === 200 || response.status === 201) {
        push(DashboardRoutes.LOGIN_OTP);
        console.log(response);
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
        onSubmit={handleSubmit(handleLogin)}
        className='flex flex-col gap-6'
      >
        <div>
          <h2 className='font-semibold'>Welcome</h2>
          <p className='mt-2 text-sm font-light'>
            To get started, please enter your registered email address below.
          </p>
        </div>

        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <CustomInput
              label='Email'
              type='email'
              placeholder='ola@gmail.com'
              {...field}
            />
          )}
        />

        <CustomButton
          text={isSubmitting ? 'Loading...' : 'Continue'}
          type='submit'
          className='w-full py-3'
          disabled={!isValid || isSubmitting}
        />

        <Link href='/auth/register'>
          <CustomButton
            text='Create Account'
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

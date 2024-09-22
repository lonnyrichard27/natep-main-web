'use client';

import { CustomButton, CustomInput } from '@/components/elements';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { verifyCertSchema } from '@/schema/certificateSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const VerifyPage = () => {
  const { push } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(verifyCertSchema) });

  const handleVerify = (data: { certificate_id: string }) => {
    setIsSubmitting(true);
    push(`${DashboardRoutes.VERIFY}/${data.certificate_id}`);
  };

  return (
    <section className='w-[368px] rounded-lg border bg-white px-6 py-10'>
      <form
        onSubmit={handleSubmit(handleVerify)}
        className='flex flex-col gap-6'
      >
        <div>
          <h2 className='font-semibold'>Verify Certificate</h2>
          <p className='mt-2 text-sm font-light text-[#344054]'>
            Please enter the Certificate ID to verify.
          </p>
        </div>

        <Controller
          control={control}
          name='certificate_id'
          render={({ field }) => (
            <CustomInput
              label='Certificate ID'
              type='text'
              placeholder='12345678910'
              error={errors.certificate_id?.message}
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
      </form>
    </section>
  );
};

export default VerifyPage;

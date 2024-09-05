'use client';

import React from 'react';
import { useFormContext } from '@/context/ApplicationFormContext';
import { CustomButton, CustomInput } from '../elements';

const VerifyNIN = () => {
  const { formData, updateFormData, nextStep } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData(e.target.name, e.target.value);
  };

  return (
    <section className='items-center justify-center md:grid'>
      <section className='w-auto rounded-lg border p-6 md:max-w-7xl md:p-16'>
        <p className='text-xl font-bold'>Verify NIN</p>
        <p className='mt-2'>
          Input the Applicant&apos;s NIN and required details.
        </p>
        <CustomInput
          id='nin'
          label='NIN'
          placeholder='81200398'
          value={formData.nin || ''}
          onChange={handleChange}
          className='my-3 mt-7'
        />
        <CustomInput
          id='email'
          label='Email Address'
          placeholder='j@gmail.com'
          onChange={(e) => console.log(e.target.value)}
          className='my-3 mt-7'
        />
        <CustomInput
          id='phone'
          label='Phone Number'
          placeholder='81200398'
          onChange={(e) => console.log(e.target.value)}
          className='my-3 mt-7'
        />

        <CustomButton
          text='Continue'
          color='text-white'
          className='mt-7 flex w-full justify-center py-3'
          onClick={nextStep}
        />
      </section>
    </section>
  );
};

export default VerifyNIN;

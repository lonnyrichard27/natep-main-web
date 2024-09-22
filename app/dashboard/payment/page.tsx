'use client';

import { CustomButton, CustomInput } from '@/components/elements';
import React from 'react';

const page = () => {
  return (
    <div className='grid items-center justify-center'>
      <div className='rounded-lg border p-20'>
        <p className='mb-10 font-bold'>Validate Payment</p>
        <p>
          Did you make any payment but haven&apos;t received value? Please
          <br /> fill in the required details below to validate your payment.
        </p>
        <CustomInput
          id='transactionId'
          label='Transaction ID/ Email'
          placeholder='81200398'
          onChange={(e) => console.log(e.target.value)}
          className='my-3 mt-5'
        />

        <CustomButton text='Validate' className='mt-7 w-full py-4' />
      </div>

      <div className='flex items-center py-3 text-sm text-gray-800 before:me-6 before:flex-1 before:border-t before:border-gray-200 after:ms-6 after:flex-1 after:border-t after:border-gray-200'>
        Secured by Paystack
      </div>
      <div className='-mt-5 border border-t-0 p-10'></div>
    </div>
  );
};

export default page;

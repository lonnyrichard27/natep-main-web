'use client';

import { CustomButton, CustomInput } from '@/components/elements';
import { SupportedPayments } from '@/public/assets/images';
import Image from 'next/image';
import React, { useState } from 'react';

const page = () => {
  const [id, setId] = useState<string>('');

  return (
    <div className='mx-auto flex flex-col items-center justify-center gap-8 md:w-[480px]'>
      <div className='flex w-full flex-col gap-8 rounded-lg border p-8'>
        <div className='flex flex-col gap-3'>
          <h2 className='font-semibold'>Validate Payment</h2>
          <p className='text-sm font-light text-[#344054]'>
            Did you make any payment but haven&apos;t received value? Please
            <br /> fill in the required details below to validate your payment.
          </p>
        </div>

        <div className='flex flex-col gap-8'>
          <CustomInput
            id='transactionId'
            label='Transaction ID / Email'
            placeholder='81200398'
            onChange={(e) => setId(e.target.value)}
          />

          <CustomButton
            text='Validate'
            className='w-full py-3 text-base'
            disabled={id.length < 5}
          />
        </div>
      </div>

      <Image src={SupportedPayments} alt='supported payments' />
    </div>
  );
};

export default page;

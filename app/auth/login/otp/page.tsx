'use client';

import OTPInput from 'react-otp-input';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { CustomButton } from '@/components/elements';

const page = () => {
  const [otp, setOtp] = useState('');

  const [seconds, setSeconds] = useState(56); // Initial countdown time in seconds

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Cleanup the interval on component unmount or when countdown reaches 0
      return () => clearInterval(interval);
    }
  }, [seconds]);

  return (
    <section className='flex w-96 flex-col gap-6 rounded-lg border bg-white px-6 py-10'>
      <div>
        <h2 className='flex items-center gap-2 font-semibold'>
          <FaRegArrowAltCircleLeft className='text-xl' /> <span>Input OTP</span>
        </h2>
        <p className='mt-2 text-sm font-light'>
          Input the 6 digit OTP sent to your email.
        </p>
      </div>

      <div className='flex flex-col gap-2'>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className='mx-0.5' />}
          renderInput={(props) => <input {...props} />}
          containerStyle='flex items-center justify-between'
          inputStyle='otp_style bg-[#F2F4F7] focus-within:bg-white'
          placeholder='000000'
        />

        <div className='text-xs font-medium'>
          {seconds > 0 ? (
            <span className='text-[#D0D5DD]'>
              OTP expires in 00:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          ) : (
            <span className='text-red-300'>OTP has expired!</span>
          )}
        </div>
      </div>

      <Link href={DashboardRoutes.BIODATA}>
        <CustomButton text='Authorize Access' className='w-full py-3' />
      </Link>

      <Link href={DashboardRoutes.REGISTER}>
        <CustomButton
          text='Create Account'
          className='w-full py-3'
          bgColor='bg-[#F2F4F7]'
          color='text-black'
        />
      </Link>
    </section>
  );
};

export default page;

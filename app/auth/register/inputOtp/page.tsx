'use client';

import CustomButton from '@/components/Custom/CustomButton';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';


const page = () => {
  return (
    <>
      <section className="border md:w-[400px] rounded-md p-5">
        <p className="flex gap-2 items-center">
          <FaRegArrowAltCircleLeft className='text-xl' /> <span>Input OTP</span>
        </p>
        <p className="font-light text-[14px] mt-2 mb-6">
        Input the 6 digit OTP sent to your email.
        </p>

        <label htmlFor="">Input OTP</label>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <small className='text-primary'>Resend OTP (00:56)</small>
        <Link href="/schedule/schedule-form-3">
          <CustomButton text="Continue" className="w-full mt-10 py-3" />
        </Link>
        <Link href="/auth/login" className="mt-5">
          <CustomButton
            text="Login"
            className="w-full mt-3 py-3"
            bgColor="bg-[#F2F4F7]"
            color="text-black"
          />
        </Link>
      </section>
    </>
  );
};

export default page;

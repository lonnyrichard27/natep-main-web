'use client';

import CustomButton from '@/components/Custom/CustomButton';
import CustomInput from '@/components/Custom/CustomInput';
import Link from 'next/link';
import React, { useState } from 'react';

const page = () => {
  return (
    <>
      <section className="border md:w-[400px] rounded-md p-5">
        <p>Welcome</p>
        <p className="font-light text-[16px] mt-2 mb-6">
        To get started, please enter your registered email address below.
        </p>

        <CustomInput
          id="emailAddress"
          label="Email"
          type="email"
          placeholder="ola@gmail.com"
          onChange={(e) => console.log(e.target.value)}
          className="my-3"
        />
        
        <Link href="/auth/login/inputOtp" className="mt-4">
          <CustomButton
            text="Continue"
            className="w-full mt-3 py-3"
          />
        </Link>
        <Link href="/auth/register" className="mt-5">
          <CustomButton
            text="Create Account"
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


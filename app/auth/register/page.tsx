'use client';

import CustomButton from '@/components/Custom/CustomButton';
import CustomInput from '@/components/Custom/CustomInput';
import Link from 'next/link';
import React, { useState } from 'react';

const page = () => {
  return (
    <>
      <section className="border md:w-[400px] rounded-md p-5">
        <p>Create Account</p>
        <p className="font-light text-[16px] mt-2 mb-6">
        Pease input your NIN and other required fields to continue.
        </p>

        <CustomInput
          id="nin"
          label="NIN"
          type="number"
          placeholder="123456789"
          onChange={(e) => console.log(e.target.value)}
          className="my-3"
        />
        <CustomInput
          id="emailAddress"
          label="Email Address"
          type="email"
          placeholder="ola@gmail.com"
          onChange={(e) => console.log(e.target.value)}
          className="my-4"
        />
        <CustomInput
          id="phone"
          label="Phone Number"
          type="number"
          placeholder="080xxxxxx"
          onChange={(e) => console.log(e.target.value)}
          className="my-3"
        />
        
        <Link href="/auth/register/biometrics" className="mt-4">
          <CustomButton
            text="Continue"
            className="w-full mt-3 py-3"
          />
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


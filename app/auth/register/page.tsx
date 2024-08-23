'use client';

import CustomButton from '@/components/Custom/CustomButton';
import CustomInput from '@/components/Custom/CustomInput';
import axiosInstance from '@/util/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();
  const [formData, setformData] = useState({
    nin: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async () => {
    const data = {
      nin: formData.nin,
      email: formData.email,
      phone: formData.phone
    };
    try {
      const response = await axiosInstance.post('auth/create-new-account', data);
      console.log(response, 'response');
      if (response.status === 200 && 201) {
        toast.success('Success');
        router.push('/auth/register/inputOtp')
      }
    } catch (error) {
      toast.error('Error please try again');
    }

  };

  const isFormEmpty = !formData.email || !formData.nin || !formData.phone;

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
          value={formData.nin}
          onChange={handleChange}
          className="my-3"
        />
        <CustomInput
          id="emailAddress"
          label="Email Address"
          type="email"
          placeholder="ola@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="my-4"
        />
        <CustomInput
          id="phone"
          label="Phone Number"
          type="number"
          placeholder="080xxxxxx"
          value={formData.phone}
          onChange={handleChange}
          className="my-3"
        />

        <CustomButton
          text="Verify Otp"
          onClick={handleSubmit}
          disabled={isFormEmpty}
          className="w-full mt-3 py-3"
        />

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

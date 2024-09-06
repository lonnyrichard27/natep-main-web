'use client';

import OTPInput from 'react-otp-input';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { CustomButton } from '@/components/elements';
import { handleError } from '@/util/errorHandler';
import { loginUser } from '@/util/helpers';
import axiosInstance from '@/util/axios';
import { newAccountTypes } from '../../register/otp/page';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const page = () => {
  const { push, back } = useRouter();
  const [otp, setOtp] = useState('');

  const [seconds, setSeconds] = useState(120); // Initial countdown time in seconds

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Cleanup the interval on component unmount or when seconds reach 0
      return () => clearInterval(interval);
    }
  }, [seconds]);

  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const disablBtn = otp.length < 6;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user, setUser] = useState<newAccountTypes>({
    email: '',
    nin: '',
    phone: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Safe to use localStorage here
      const storedUser: any = localStorage.getItem('user_account');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleVerifyLogin = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/auth/verify-otp', {
        ...user,
        otp: otp,
      });
      if (response.status === 200 || response.status === 201) {
        const data = { token: response.data.data, isAuthenticated: true };

        loginUser(data);
        push(DashboardRoutes.BIODATA);
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      handleError(error);
    }
  };

  const [isSending, setIsSending] = useState(false);
  const handleResendOTP = async () => {
    setIsSending(true);
    try {
      const response = await axiosInstance.post('/auth/resend-otp', {
        email: user.email,
        phone: user.phone,
        nin: user.nin,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success('OTP sent. Please check your email');
        setIsSending(false);
      }
    } catch (error) {
      setIsSending(false);
      handleError(error);
    }
  };

  return (
    <section className='flex w-96 flex-col gap-6 rounded-lg border bg-white px-6 py-10'>
      <div>
        <button onClick={back}>
          <h2 className='flex items-center gap-2 font-semibold'>
            <FaRegArrowAltCircleLeft className='text-xl' />
            <span>Input OTP</span>
          </h2>
        </button>
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
              OTP expires in {minutes < 10 ? `0${minutes}` : minutes}:
              {remainingSeconds < 10
                ? `0${remainingSeconds}`
                : remainingSeconds}
            </span>
          ) : (
            <button
              onClick={handleResendOTP}
              className='text-green-500'
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Resend OTP!'}
            </button>
          )}
        </div>
      </div>

      <CustomButton
        text='Authorize Access'
        onClick={handleVerifyLogin}
        disabled={disablBtn || isSubmitting}
        className='w-full py-3'
      />

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

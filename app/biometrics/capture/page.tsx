'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { IoAlertCircleOutline } from 'react-icons/io5';
import CameraCapture from '@/components/CameraCapture';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import axiosInstance from '@/util/axios';
import { useRouter } from 'next/navigation';
import { handleError } from '@/util/errorHandler';

const page = () => {
  const { push } = useRouter();

  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = (imageDataUrl: string) => {
    setCapturedImage(imageDataUrl);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitImage = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/auth/face-recognition', {
        facebase64: capturedImage,
      });
      if (response.status === 200 || response.status === 201) {
        push(DashboardRoutes.BIODATA);
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      handleError(error);
    }
  };

  return (
    <section className='flex w-96 flex-col gap-6 rounded-lg border bg-white px-6 py-10'>
      <div>
        <Link
          href={DashboardRoutes.BIOMETRICS}
          className='flex items-center gap-2 font-semibold'
        >
          <FaRegArrowAltCircleLeft className='text-xl' />
          <span>Capture Image</span>
        </Link>

        <p className='mt-2 text-sm font-light'>
          Kindly verify your facial biometrics.
        </p>
      </div>

      <div>
        <CameraCapture
          onCapture={handleCapture}
          buttonText='Take Picture'
          continueButton={handleSubmitImage}
          capturedImage={capturedImage}
          setCapturedImage={setCapturedImage}
          isSubmitting={isSubmitting}
        />
      </div>

      <div className='flex items-center gap-2 rounded border border-[#D1FADF] bg-[#ECFDF3] p-3'>
        <IoAlertCircleOutline />
        <span className='text-xs text-[#344054]'>
          Please turn your head to the left
        </span>
      </div>
    </section>
  );
};

export default page;

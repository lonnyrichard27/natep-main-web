'use client';

import CustomButton from '@/components/Custom/CustomButton';
import CustomInput from '@/components/Custom/CustomInput';
import CameraFocus from '@/components/svgs/CameraFocus';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { TbEyeFilled } from 'react-icons/tb';
import { IoSunny } from 'react-icons/io5';
import Image from 'next/image';
import CameraCapture from '@/components/CameraCapture';

const page = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = (imageDataUrl: string) => {
    setCapturedImage(imageDataUrl);
  };

  const handleSubmitImage = () => {
    console.log('first')
  };
  return (
    <>
      <section className="border md:w-[500px] rounded-md p-5">
        <Link
          href="/auth/register/biometrics"
          className="flex gap-2 items-center"
        >
          <FaRegArrowAltCircleLeft className="text-xl" />{' '}
          <span>Capture Image</span>
        </Link>

        <p className="mt-4">Kindly verify your facial biometrics.</p>

        <section>
          <CameraCapture
            onCapture={handleCapture}
            buttonText="Take Picture"
            continueButton={handleSubmitImage}
          />
        </section>
      </section>
    </>
  );
};

export default page;

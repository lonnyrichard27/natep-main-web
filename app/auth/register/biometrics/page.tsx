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
  return (
    <>
      <section className="border md:w-[500px] rounded-md p-5">
        <p className="flex gap-2 items-center">
          <FaRegArrowAltCircleLeft className="text-xl" />{' '}
          <span>Verify Biometrics</span>
        </p>

        <p className="mt-4">Kindly verify your facial biometrics.</p>

        <div className="flex gap-3">
          <div className="bg-[#EBF9F0] h-20 w-28 flex items-center justify-center rounded-lg">
            <CameraFocus />
          </div>
          <div className="flex-col">
            <p className="font-bold text-xl">Camera Focus</p>
            <p className="mt-3">
              Position yourself at the center of the camera when taking a
              selfie.
            </p>
          </div>
        </div>

        <div className="flex gap-3 my-5">
          <div className="bg-[#EBF9F0] h-20 w-32 flex items-center justify-center rounded-lg">
            <TbEyeFilled className="text-xl text-primary" />
          </div>
          <div className="flex-col">
            <p className="font-bold text-xl">Clear face</p>
            <p className="mt-3">
              Do not block your face with your hair, glasses or face mask when
              taking a selfie.
            </p>
          </div>
        </div>

        <div className="flex gap-3 my-5">
          <div className="bg-[#EBF9F0] h-20 w-28 flex items-center justify-center rounded-lg">
            <IoSunny className="text-xl text-primary" />
          </div>
          <div className="flex-col">
            <p className="font-bold text-xl">Bright background</p>
            <p className="mt-3">
              Ensure adequate light and a clear background when taking a
              selfie..
            </p>
          </div>
        </div>

        {/* <section className='bg-[#ECF2F7] p-4'>
          <div className="md:flex my-2">
            <section>
              <p>Continue on mobile</p>
              <p>Scan this barcode to continue the verification process on mobile.</p>
            </section>
          <Image  
            src={BarCodeImg}
            alt='nav logo'
            width={100}
            height={100}
            className="w-auto"
          />
          </div>
        </section> */}
        <section></section>

        <Link href="/auth/register/biometrics/capture" className="mt-4">
          <CustomButton
            text="Continue on this device"
            className="w-full mt-3 py-3"
          />
        </Link>
      </section>
    </>
  );
};

export default page;

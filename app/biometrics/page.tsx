'use client';

import CameraFocus from '@/components/svgs/CameraFocus';
import Link from 'next/link';
import React from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { TbEyeFilled } from 'react-icons/tb';
import { IoSunny } from 'react-icons/io5';
import QRCode from 'react-qr-code';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { CustomButton } from '@/components/elements';

const Page = () => {
  const instructions = [
    {
      title: 'Camera Focus',
      desc: 'Position yourself at the center of the camera when taking a selfie.',
      icon: <CameraFocus />,
    },
    {
      title: 'Clear face',
      desc: 'Do not block your face with your hair, glasses or face mask when taking a selfie.',
      icon: <TbEyeFilled />,
    },
    {
      title: 'Bright background',
      desc: 'Ensure adequate light and a clear background when taking a selfie.',
      icon: <IoSunny />,
    },
  ];

  const websiteLink = 'www.google.come';

  return (
    <section className='flex w-96 flex-col gap-6 rounded-lg border bg-white px-6 py-10'>
      <div>
        <h2 className='flex items-center gap-2 font-semibold'>
          <FaRegArrowAltCircleLeft className='text-xl' />
          <span>Verify Biometrics</span>
        </h2>
        <p className='mt-2 text-sm font-light'>
          Kindly verify your facial biometrics.
        </p>
      </div>

      {instructions?.map((instruct, index) => (
        <div key={index} className='flex gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#EBF9F0] text-xl text-primary'>
            {instruct.icon}
          </div>
          <div className='flex flex-1 flex-col gap-1'>
            <p className='text-sm font-bold text-[#344054]'>{instruct.title}</p>
            <p className='text-sm font-light text-[#667085]'>{instruct.desc}</p>
          </div>
        </div>
      ))}

      <div className='flex items-center rounded-lg bg-[#ECF2F7] p-4'>
        <div>
          <h3 className='mb-1 text-sm font-semibold'>Continue on mobile</h3>
          <p className='text-xs leading-5 text-[#344054]'>
            Scan this barcode to continue the verification process on mobile.
          </p>
        </div>

        <div className='flex-1 rounded-md bg-white p-2'>
          <QRCode value={websiteLink} size={80} />
        </div>
      </div>

      <Link href={DashboardRoutes.BIOMETRICS_CAPTURE}>
        <CustomButton text='Continue on this device' className='w-full py-3' />
      </Link>
    </section>
  );
};

export default Page;

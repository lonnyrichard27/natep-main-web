'use client';

import { Navbar, Footer } from '@/components/Navigation';
import { DeleteAccount1, DeleteAccount2 } from '@/public/images';
import Image from 'next/image';
import React from 'react';

const DeleteAccountPage = () => {
  const types_of_data = [
    'Personal information (name, email address, phone number)',
    'Transaction history',
    'Any other personal information you have provided to us.',
  ];

  return (
    <>
      <Navbar />

      <div className='bg-background-gray py-20'>
        <div className='mx-auto flex flex-col gap-7 bg-white p-10 text-sm !font-light leading-6 lg:w-[720px]'>
          <div>
            <h1 className='mb-2 text-lg font-semibold text-[#101828]'>
              How to Delete your Account on NTEP Mobile App
            </h1>
            <p className='text-[#344054]'>Last Updated: 01 JUL 2024</p>
          </div>

          <div className='flex flex-col gap-3'>
            <p>
              We take your privacy seriously. If you would like to request that
              your data be deleted, please follow these simple steps:
            </p>
            <p>- Launch App</p>
            <p>- Navigate to the More menu</p>
          </div>

          <Image
            src={DeleteAccount1}
            width={173}
            height={375}
            alt='mobile app image'
          />

          <div className='flex flex-col gap-3'>
            <p>- Tap on the Delete Account button</p>
            <p>- Confirm that you would like to delete your Account / Data</p>
          </div>

          <Image
            src={DeleteAccount2}
            width={173}
            height={375}
            alt='mobile app image'
          />

          <div className='flex flex-col gap-3'>
            <p>
              NATEP App deletes the following types of data when you request
              that your Account be deleted:
            </p>

            <ul className='flex list-decimal flex-col gap-1 pl-5'>
              {types_of_data?.map((item, index) => <li key={index}>{item}</li>)}
            </ul>

            <p>
              Please note that we may be required to retain certain data for
              legal or regulatory purposes, but we will delete your personal
              information to the extent possible and in accordance with
              applicable laws and regulations.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeleteAccountPage;

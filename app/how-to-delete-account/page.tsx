'use client';

import { Navbar, Footer } from '@/components/Navigation';
import React from 'react';

const DeleteAccountPage = () => {
  return (
    <>
      <Navbar />

      <div className='bg-background-gray py-20'>
        <div className='mx-auto flex flex-col gap-12 bg-white p-10 text-sm !font-light lg:w-[720px]'>
          <div>
            <h1 className='mb-2 text-lg font-semibold text-[#101828]'>
              Privacy Policy for the National Talent Export Programme (NATEP)
              App
            </h1>
            <p className='text-[#344054]'>Effective Date: 01 JUL 2024</p>

            <p className='mt-6'>
              At NATEP, we are committed to safeguarding your personal data and
              ensuring your privacy. This Privacy Policy outlines how we
              collect, use, protect, and share your information in compliance
              with the latest data protection regulations, including principles
              of privacy by design and privacy by default.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeleteAccountPage;

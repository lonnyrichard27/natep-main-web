'use client';

import React, { useState } from 'react';
import FileUpload from '../FileUpload';
import HeaderNav from '../HeaderNav';
import { useFormContext } from '@/context/ApplicationFormContext';
import { useRouter } from 'next/navigation';
import { CustomButton } from '../elements';

const MedicalReport = () => {
  const router = useRouter();
  const { formData, updateFormData, prevStep, nextStep } = useFormContext();

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
    // Handle the file upload logic here
  };

  const complete = () => {
    router.push('/dashboard/new-application/view-application');
  };

  return (
    <section className='mt-10 items-center justify-center md:grid'>
      <section className='rounded-lg border p-6'>
        <HeaderNav onClick={prevStep} title='Medical Report' />

        <p className='mb-10 mt-2 text-lg font-light'>
          Kindly provide your medical report here.
        </p>
        <FileUpload onFileUpload={handleFileUpload} title='Upload Report' />
        <div className='gap-4 md:flex'>
          <CustomButton
            text='Save & Exit'
            color='text-black'
            className='mt-7 flex w-full justify-center py-3'
            onClick={nextStep}
            bgColor='bg-[#F2F4F7]'
          />

          <CustomButton
            text='Continue'
            color='text-white'
            className='mt-7 flex w-full justify-center py-3'
            onClick={complete}
          />
        </div>
      </section>
    </section>
  );
};

export default MedicalReport;

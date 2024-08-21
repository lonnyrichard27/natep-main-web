'use client';

import React, { useState } from 'react';
import FileUpload from '../FileUpload';
import HeaderNav from '../HeaderNav';
import CustomButton from '../Custom/CustomButton';
import { useFormContext } from '@/context/ApplicationFormContext';
import { useRouter } from 'next/navigation';

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
    <section className="md:grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={prevStep} title="Medical Report" />

        <p className="mt-2 mb-10 text-lg font-light">
          Kindly provide your medical report here.
        </p>
        <FileUpload onFileUpload={handleFileUpload} title="Upload Report" />
        <div className="md:flex gap-4">
          <CustomButton
            text="Save & Exit"
            color="text-black"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={nextStep}
            bgColor="bg-[#F2F4F7]"
          />

          <CustomButton
            text="Continue"
            color="text-white"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={complete}
          />
        </div>
      </section>
    </section>
  );
};

export default MedicalReport;

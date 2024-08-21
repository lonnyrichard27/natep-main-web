'use client'

import React from 'react';
import CustomInput from '../Custom/CustomInput';
import CustomButton from '../Custom/CustomButton';
import { useFormContext } from '@/context/ApplicationFormContext';

const VerifyNIN = () => {
  const { formData, updateFormData, nextStep } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData(e.target.name, e.target.value);
  };

  return (
    <section className="md:grid items-center justify-center">
      <section className="border md:max-w-7xl w-auto rounded-lg p-6 md:p-16">
        <p className="font-bold text-xl">Verify NIN</p>
        <p className="mt-2">Input the Applicant’s NIN and required details.</p>
        <CustomInput
          id="nin"
          label="NIN"
          placeholder="81200398"
          value={formData.nin || ''}
          onChange={handleChange}
          className="my-3 mt-7"
        />
        <CustomInput
          id="email"
          label="Email Address"
          placeholder="j@gmail.com"
          onChange={(e) => console.log(e.target.value)}
          className="my-3 mt-7"
        />
        <CustomInput
          id="phone"
          label="Phone Number"
          placeholder="81200398"
          onChange={(e) => console.log(e.target.value)}
          className="my-3 mt-7"
        />
        
        <CustomButton
          text="Continue"
          color="text-white"
          className="py-3 w-full flex mt-7 justify-center"
          onClick={nextStep}
        />
      </section>
    </section>
  );
};

export default VerifyNIN;

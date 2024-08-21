'use client';

import React, { useState } from 'react';
import CustomInput from '../Custom/CustomInput';
import { useFormContext } from '@/context/ApplicationFormContext';
import FileUpload from '../FileUpload';
import HeaderNav from '../HeaderNav';
import CustomButton from '../Custom/CustomButton';

const PoliceReport = () => {
  const { formData, updateFormData, prevStep, nextStep } = useFormContext();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
    // Handle the file upload logic here
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData(e.target.name, e.target.value);
  };
  return (
    <section className="md:grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={prevStep} title="Police Report" />

        <p className="mt-2 text-lg font-light">
          Kindly provide your police report details here.
        </p>
        <CustomInput
          id="nin"
          label="POSSAP Number"
          placeholder="81200398"
          value={formData.nin || ''}
          onChange={handleChange}
          className="my-3 mt-7"
        />

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
            onClick={nextStep}
          />
        </div>
      </section>
    </section>
  );
};

export default PoliceReport;

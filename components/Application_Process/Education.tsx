'use client';

import React, { useState } from 'react';
import CustomButton from '../Custom/CustomButton';
import { useFormContext } from '@/context/ApplicationFormContext';
import CustomSelect from '../Custom/CustomSelect';
import FileUpload from '../FileUpload';
import HeaderNav from '../HeaderNav';

const Education = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
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
        <HeaderNav onClick={prevStep} title="Education" />

        <p className="mt-2 text-lg font-light">Kindly provide your educational documents here.</p>

        <CustomSelect
          label="Educational Level"
          name="color"
          id="color-select"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className="mt-5"
        />

        <CustomSelect
          label="Select Institution"
          name="color"
          id="color-select"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className="my-5"
        />

        <FileUpload
          onFileUpload={handleFileUpload}
          title="Upload Certificate"
        />
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

export default Education;

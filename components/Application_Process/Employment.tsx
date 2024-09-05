'use client';

import React, { useState } from 'react';
import { useFormContext } from '@/context/ApplicationFormContext';
import CustomSelect from '../elements/CustomSelect';
import FileUpload from '../FileUpload';
import CustomTextArea from '../elements/CustomTextArea';
import HeaderNav from '../HeaderNav';
import { CustomButton, CustomInput } from '../elements';

const Employment = () => {
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
    <section className='mt-10 items-center justify-center md:grid'>
      <section className='rounded-lg border p-6'>
        <HeaderNav onClick={prevStep} title='Employment' />

        <p className='mt-2 text-lg font-light'>
          Kindly provide your employment details here.
        </p>
        <CustomInput
          id='nin'
          label='Company Name'
          placeholder='81200398'
          value={formData.nin || ''}
          onChange={handleChange}
          className='my-3 mt-7'
        />
        <CustomSelect
          label='Country'
          name='color'
          id='color-select'
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className='mt-5'
        />

        <CustomSelect
          label='State'
          name='color'
          id='color-select'
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className='mt-5'
        />

        <CustomTextArea
          label='Office Address'
          id='textarea-address'
          placeholder='Enter your address...'
          value={'eee'}
          onChange={(e) => console.log(e.target.value)}
        />

        <FileUpload
          onFileUpload={handleFileUpload}
          title='Signed Offer Letter'
        />

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
            onClick={nextStep}
          />
        </div>
      </section>
    </section>
  );
};

export default Employment;

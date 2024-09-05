'use client';

import React, { useState } from 'react';
import { useFormContext } from '@/context/ApplicationFormContext';
import HeaderNav from '../HeaderNav';
import { CustomButton, CustomSelect, CustomTextArea } from '../elements';

const Address = () => {
  // const { formData, updateFormData } = useFormContext();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const { formData, updateFormData, prevStep, nextStep } = useFormContext();

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
        <HeaderNav onClick={prevStep} title='Address' />

        <p className='mt-5 text-lg font-light'>
          Ensure this is your current address, your sealed certificate will
          <br /> be delivered to this address.
        </p>

        <CustomSelect
          label='Select State'
          name='color'
          id='color-select'
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className='mt-5'
        />

        <CustomSelect
          label='Select LGA'
          name='color'
          id='color-select'
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className='mt-5'
        />

        <CustomTextArea
          label='Input Address'
          id='textarea-address'
          placeholder='Enter your address...'
          value={'eee'}
          onChange={(e) => console.log(e.target.value)}
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

export default Address;

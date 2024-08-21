'use client';

import React, { useState } from 'react';
import CustomInput from '../Custom/CustomInput';
import CustomButton from '../Custom/CustomButton';
import { useFormContext } from '@/context/ApplicationFormContext';
import CustomSelect from '../Custom/CustomSelect';
import HeaderNav from '../HeaderNav';
import CustomTextArea from '../Custom/CustomTextArea';

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
    <section className="md:grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={prevStep} title="Address" />

        <p className="mt-5 text-lg font-light">
          Ensure this is your current address, your sealed certificate will
          <br /> be delivered to this address.
        </p>

        <CustomSelect
          label="Select State"
          name="color"
          id="color-select"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className="mt-5"
        />

        <CustomSelect
          label="Select LGA"
          name="color"
          id="color-select"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className="mt-5"
        />

        <CustomTextArea
          label="Input Address"
          id="textarea-address"
          placeholder="Enter your address..."
          value={'eee'}
          onChange={(e) => console.log(e.target.value)}
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

export default Address;

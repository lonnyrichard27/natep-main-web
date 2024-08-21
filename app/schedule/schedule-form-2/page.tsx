'use client';

import CustomButton from '@/components/Custom/CustomButton';
import CustomInput from '@/components/Custom/CustomInput';
import CustomSelect from '@/components/Custom/CustomSelect';
import Link from 'next/link';
import React, { useState } from 'react';

const page = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    { value: 'red', label: 'Certificate renewal' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="border md:w-[368px] rounded-md p-5">
        <p>Schedule Appointment</p>
        <p className="font-light text-[14px] mt-2 mb-6">
          Fill in the required fields appropriately.
        </p>

        <CustomSelect
          label="Activity Type"
          name="color"
          id="color-select"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className="mt-5"
        />

        <CustomInput
          id="applicantid"
          label="Applicant ID"
          type="text"
          placeholder="NP-9438593"
          onChange={(e) => console.log(e.target.value)}
          className="my-3"
        />
        
        <Link href='/schedule/schedule-form-3'>
          <CustomButton text="Complete Payment" className="w-full mt-3" />
        </Link>
      </section>
    </main>
  );
};

export default page;


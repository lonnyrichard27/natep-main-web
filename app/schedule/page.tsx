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
    { value: 'red', label: 'Red' },
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
          label="Is this your first time?"
          name="color"
          id="color-select"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className="mt-5"
        />
        <div className="flex gap-4 mt-3">
          <CustomInput
            id="firstName"
            label="First Name"
            placeholder="John"
            onChange={(e) => console.log(e.target.value)}
          />
          <CustomInput
            id="lastName"
            label="Last Name"
            placeholder="Doe"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>

        <CustomInput
          id="email"
          label="Email"
          type="email"
          placeholder="john@gmail.com"
          onChange={(e) => console.log(e.target.value)}
          className="my-3"
        />

        <CustomInput
          id="phone"
          label="Phone Number"
          type="number"
          placeholder="080xxxxx"
          onChange={(e) => console.log(e.target.value)}
        />

        <Link href="/schedule/schedule-form-2">
          <CustomButton text="Continue" className="w-full mt-3" />
        </Link>
      </section>
    </main>
  );
};

export default page;

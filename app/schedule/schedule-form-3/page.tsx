'use client';

import CustomButton from '@/components/Custom/CustomButton';
import CustomSelect from '@/components/Custom/CustomSelect';
import Link from 'next/link';
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';

const page = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [date, setDate] = React.useState<Date | undefined>(new Date());

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
        <p className="flex gap-2 items-center">
          <FaRegArrowAltCircleLeft /> <span>Select Date and Time</span>
        </p>
        <p className="font-light text-[14px] mt-2 mb-6">
          Select your preferred date and time below.
        </p>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />

        <CustomSelect
          label="Select Time"
          name="color"
          id="color-select"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className="mt-5"
        />
        <Link href="/schedule/schedule-final">
          <CustomButton text="Continue" className="w-full mt-3" />
        </Link>
      </section>
    </main>
  );
};

export default page;

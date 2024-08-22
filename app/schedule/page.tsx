'use client';

import CustomButton from '@/components/Custom/CustomButton';
import CustomInput from '@/components/Custom/CustomInput';
import CustomSelect from '@/components/Custom/CustomSelect';
import { setLocalStorageItem } from '@/util/localStorage';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const page = () => {
  const router = useRouter();
  const [formData, setformData] = useState({
    nin: '',
    email: '',
    phone: '',
    applicantId: '',
  });

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [activityType, setActivityType] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleActivity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActivityType(event.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleContinue = () => {
    const data = {
      nin: formData.nin,
      email: formData.email,
      phone: formData.phone,
      applicantID: formData.applicantId,
      activity: activityType,
      firstTime: selectedOption,
    };
    setLocalStorageItem('schedule-data', JSON.stringify(data));
    router.push('/schedule/schedule-form-3');
  };

  const activities = [
    { value: 'certificate delivery', label: 'certificate delivery' },
    { value: 'certificate renewal', label: 'certificate renewal' },
  ];

  const options = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];

  return (
    <main className="md:flex min-h-screen flex-col mx-auto items-center justify-center">
      <section className="border rounded-md p-5">
        <p className="">Schedule Appointment</p>
        <p className="font-light text-[14px] mt-5 mb-6">
          Fill in the required fields appropriately.
        </p>

        <CustomSelect
          label="Is this your first time?"
          name="selectedOption"
          id="firstTime-select"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className="mt-5"
        />
        {selectedOption === 'true' || selectedOption === 'false' ? (
          selectedOption === 'true' ? (
            <div className="mt-3 w-full">
              <CustomInput
                id="nin"
                label="NIN"
                type="number"
                placeholder="123456789"
                value={formData.nin}
                onChange={handleChange}
              />
              <CustomInput
                id="email"
                label="Email"
                type="email"
                placeholder="john@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="my-3"
              />
              <CustomInput
                id="phone"
                label="Phone Number"
                type="number"
                placeholder="080xxxxx"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className="mt-4">
              <CustomSelect
                label="Activity Type"
                name="activityType"
                id="activityType-select"
                options={activities}
                value={activityType}
                onChange={handleActivity}
                className="mt-5"
              />
              <CustomInput
                id="applicantId"
                label="Applicant ID"
                type="text"
                placeholder="NP-9438593"
                value={formData.applicantId}
                onChange={handleChange}
                className="my-5"
              />
            </div>
          )
        ) : (
          <div></div>
        )}
        <div className="flex gap-4 mt-3"></div>

        <CustomButton
          text="Continue"
          className="w-full mt-3"
          onClick={handleContinue}
        />
      </section>
    </main>
  );
};

export default page;

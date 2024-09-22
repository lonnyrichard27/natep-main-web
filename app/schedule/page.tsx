'use client';

import { CustomButton, CustomInput, CustomSelect } from '@/components/elements';
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

  const [selectedOption, setSelectedOption] = useState<boolean>(false);
  const [activityType, setActivityType] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // @ts-ignore
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
    <section className='w-96 rounded-md border bg-white px-6 py-10'>
      <div className='flex flex-col gap-6'>
        <div>
          <h2 className='font-semibold'>Schedule Appointment</h2>
          <p className='mt-2 text-sm font-light'>
            Fill in the required fields appropriately.
          </p>
        </div>

        <CustomSelect
          label='Is this your first time?'
          name='selectedOption'
          id='firstTime-select'
          options={options}
          // @ts-ignore

          value={selectedOption}
          onChange={handleSelectChange}
        />
        {selectedOption ? (
          <>
            <CustomInput
              id='nin'
              label='NIN'
              type='number'
              placeholder='123456789'
              value={formData.nin}
              onChange={handleChange}
            />
            <CustomInput
              id='email'
              label='Email'
              type='email'
              placeholder='john@gmail.com'
              value={formData.email}
              onChange={handleChange}
            />
            <CustomInput
              id='phone'
              label='Phone Number'
              type='number'
              placeholder='080xxxxx'
              value={formData.phone}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <CustomSelect
              label='Activity Type'
              name='activityType'
              id='activityType-select'
              options={activities}
              value={activityType}
              onChange={handleActivity}
            />
            <CustomInput
              id='applicantId'
              label='Applicant ID'
              type='text'
              placeholder='NP-9438593'
              value={formData.applicantId}
              onChange={handleChange}
            />
          </>
        )}
      </div>
      <div className='mt-3 flex gap-4'></div>

      <CustomButton
        text='Continue'
        className='mt-3 w-full'
        onClick={handleContinue}
      />
    </section>
  );
};

export default page;

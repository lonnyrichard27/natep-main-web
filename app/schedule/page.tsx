'use client';

import { CustomButton, CustomInput, CustomSelect } from '@/components/elements';
import { LoaderModal } from '@/components/Navigation';
import { ScheduleSuccessModal } from '@/components/sections/schedule';
import { validateTransaction } from '@/services/transaction-services';
import { setLocalStorageItem } from '@/util/localStorage';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nin: '',
    email: '',
    phone: '',
    applicantId: '',
  });

  const [selectedOption, setSelectedOption] = useState<string>('false');
  const [activityType, setActivityType] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleActivityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActivityType(event.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
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
      firstTime: selectedOption
    };
    setLocalStorageItem('schedule-data', JSON.stringify(data));
    router.push('/schedule/schedule-form-3');
  };


  const activities = [
    { value: 'certificate delivery', label: 'Certificate Delivery' },
    { value: 'certificate renewal', label: 'Certificate Renewal' }
  ];

  const options = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' }
  ];

  const searchParams = useSearchParams();

  // Retrieve the 'txref' and 'rrr' query parameters
  const txref = searchParams.get('txref');
  const rrr = searchParams.get('rrr');

  const { isLoading: isVerifying, isSuccess } = useQuery({
    queryKey: ['verify-transaction', txref, rrr],
    queryFn: () => validateTransaction({ rrr, txref }),
    enabled: !!txref && !!rrr,
  });

  return (
    <section className="w-96 rounded-md border bg-white px-6 py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold">Schedule Appointment</h2>
          <p className="mt-2 text-sm font-light">
            Fill in the required fields appropriately.
          </p>
        </div>

        <CustomSelect
          label="Is this your first time?"
          name="selectedOption"
          id="firstTime-select"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
        />

        {selectedOption === 'true' ? (
          <>
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
            />
            <CustomInput
              id="phone"
              label="Phone Number"
              type="number"
              placeholder="080xxxxx"
              value={formData.phone}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <CustomSelect
              label="Activity Type"
              name="activityType"
              id="activityType-select"
              options={activities}
              value={activityType}
              onChange={handleActivityChange}
            />
            <CustomInput
              id="applicantId"
              label="Applicant ID"
              type="text"
              placeholder="NP-9438593"
              value={formData.applicantId}
              onChange={handleChange}
            />
          </>
        )}
      </div>

      <CustomButton
        text="Continue"
        className="mt-3 w-full"
        onClick={handleContinue}
      />

      {rrr && txref && (
        <>
          {isVerifying && <LoaderModal />}
          {isSuccess && <ScheduleSuccessModal />}
        </>
      )}
    </section>
  );
};

export default Page;

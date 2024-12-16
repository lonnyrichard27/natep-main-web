'use client';

import { CustomButton, CustomInput, CustomSelect } from '@/components/elements';
import { LoaderModal } from '@/components/Navigation';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { ScheduleSuccessModal } from '@/components/sections/schedule';
import { validateTransaction } from '@/services/transaction-services';
import { ApiResponse } from '@/types/ApiResponse';
import axiosInstance from '@/util/axios';
import { YesNoOptions } from '@/util/data';
import { handleError } from '@/util/errorHandler';
import { stringToBoolean } from '@/util/helpers';
import { setLocalStorageItem } from '@/util/localStorage';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const [formData, setFormData] = useState({
    nin: '',
    email: '',
    phone: '',
    applicantId: '',
  });

  const [firstTime, setFirstTime] = useState<string>('false');
  const [activityType, setActivityType] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFirstTime(event.target.value);
  };

  const handleActivityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActivityType(event.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleContinue = async () => {
    setIsSubmitting(true);

    let data: any = {
      applicantID: formData.applicantId,
      activity: activityType,
      firstTime: firstTime,
    };

    if (stringToBoolean(firstTime)) {
      data = {
        ...data,
        nin: formData.nin,
        email: formData.email,
        phone: formData.phone,
      };
      setLocalStorageItem('schedule-data', JSON.stringify(data));
      router.push('/schedule/schedule-form-3');
    } else {
      try {
        const response = await axiosInstance.get<ApiResponse>(
          `/biodata/view-public-profile/${formData.applicantId}`
        );

        const user: any = response.data?.data;

        data = {
          ...data,
          nin: user.nin,
          email: user.email,
          phone: user.phone,
        };

        setLocalStorageItem('schedule-data', JSON.stringify(data));
        router.push('/schedule/schedule-form-3');
        return;
      } catch (error) {
        setIsSubmitting(false);
        handleError(error);
      }
    }
  };

  const activities = [
    { value: 'certificate delivery', label: 'Certificate Delivery' },
    { value: 'certificate renewal', label: 'Certificate Renewal' },
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
          name='firstTime'
          id='firstTime-select'
          options={YesNoOptions}
          value={firstTime}
          onChange={handleSelectChange}
        />

        {firstTime === 'true' ? (
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
              onChange={handleActivityChange}
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

      <CustomButton
        text={isSubmitting ? 'Loading...' : 'Continue'}
        className='mt-3 w-full'
        onClick={handleContinue}
        color='text-white'
        disabled={isSubmitting}
      />

      {rrr && txref && (
        <>
          {isVerifying && <LoaderModal />}
          {isSuccess && (
            <ScheduleSuccessModal closeLink={DashboardRoutes.HOME} />
          )}
        </>
      )}
    </section>
  );
};

export default Page;

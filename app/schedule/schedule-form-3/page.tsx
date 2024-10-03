'use client';

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { generateTimeSlots } from '@/util/time';
import { getLocalStorageItem } from '@/util/localStorage';
import axiosInstance from '@/util/axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { CustomButton } from '@/components/elements';
import { remitaPayment } from '@/util/remitaPayment';
import { DashboardRoutes } from '@/components/Navigation/Routes';

const page = () => {
  const timeSlots = generateTimeSlots(60);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('9:00 AM');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };
  const submit = async () => {
    const data = getLocalStorageItem('schedule-data');
    const extractedData = JSON.parse(data);
    const dateWithT = date?.toISOString().slice(0, 11);
    const fullTimestamp = dateWithT + selectedTime;

    const dataToSend = {
      is_first_time: extractedData.firstTime,
      nin: extractedData.nin,
      delivery_time: fullTimestamp,
      email: extractedData.email,
      phone: extractedData.phone,
      applicant_id: extractedData.applicantID,
      activity_type: extractedData.activity,
    };

    try {
      const response = await axiosInstance.post(
        'delivery/schedule-appointment',
        dataToSend
      );
      if (response.status === 200 && 201) {
        const { rrr, txref } = response.data.data;
        remitaPayment({
          rrr,
          transactionId: txref,
          callbackURL: DashboardRoutes.SCHEDULE,
        });
      }
    } catch (error) {
      // @ts-ignore
      toast.error(error?.response?.data?.message);
      //  console.log(error?.response?.data?.message, 'error')
    }
  };

  return (
    <main className='flex-col md:flex md:min-h-screen md:items-center md:justify-center'>
      <section className='rounded-md border p-5'>
        <Link href='/schedule' className='flex items-center gap-2'>
          <FaRegArrowAltCircleLeft /> <span>Select Date and Time</span>
        </Link>

        <p className='mb-6 mt-2 text-[14px] font-light'>
          Select your preferred date and time below.
        </p>

        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='rounded-md border'
        />

        <div>
          <p>Select Time</p>
          <select
            value={selectedTime}
            onChange={handleChange}
            className='mt-2 w-full rounded border p-2 text-gray-600'
          >
            {timeSlots.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        {/* <Link href="/schedule/schedule-final"> */}
        <CustomButton
          text='Continue'
          onClick={submit}
          className='mt-3 w-full'
        />
        {/* </Link> */}
      </section>
    </main>
  );
};

export default page;

'use client';

import CustomButton from '@/components/Custom/CustomButton';
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { generateTimeSlots } from '@/util/time';
import { getLocalStorageItem } from '@/util/localStorage';
import axiosInstance from '@/util/axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

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
      activity_type: extractedData.activity
    };

    try {
      const response = await axiosInstance.post(
        'delivery/schedule-appointment',
        dataToSend
      );
      if (response.status === 200 && 201) {
        window.location.href = response?.data?.data;
      }
      console.log(response, 'delivery');
    } catch (error) {
      // @ts-ignore
      toast.error(error?.response?.data?.message);
      //  console.log(error?.response?.data?.message, 'error')
    }
  };

  return (
    <main className="md:flex md:min-h-screen flex-col md:items-center md:justify-center">
      <section className="border rounded-md p-5">
        <Link href='/schedule' className="flex gap-2 items-center">
          <FaRegArrowAltCircleLeft /> <span>Select Date and Time</span>
        </Link>

        <p className="font-light text-[14px] mt-2 mb-6">
          Select your preferred date and time below.
        </p>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />

        <div>
          <p>Select Time</p>
          <select
            value={selectedTime}
            onChange={handleChange}
            className="w-full p-2 mt-2 border rounded text-gray-600"
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
          text="Continue"
          onClick={submit}
          className="w-full mt-3"
        />
        {/* </Link> */}
      </section>
    </main>
  );
};

export default page;

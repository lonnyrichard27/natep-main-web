'use client';

import React, { useState } from 'react';
import { CustomButton } from '@/components/elements';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { generateTimeSpecificSlot } from '@/util/time';
import { getLocalStorageItem } from '@/util/localStorage';
import axiosInstance from '@/util/axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { formatDate, stringToBoolean } from '@/util/helpers';
import { handleError } from '@/util/errorHandler';
import {
  generateRemitaRRR,
  isRemitaSuccessResponse,
} from '@/util/generateRemitaRRR';
import { RRRModal } from '@/components/sections/certificates';

const page = () => {
  const defaultClassNames = getDefaultClassNames();
  const timeSlots = generateTimeSpecificSlot();
  const [selected, setSelected] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const [txnDetails, setTxnDetails] = useState({
    rrr: '',
    txref: '',
    amount: 0,
  });

  const handleRemitaModal = () => {
    setOpen(!open);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedTime(event.target.value);

  const disabledBtn = !selected || !selectedTime || loading;

  const handleSchedule = async () => {
    const data = getLocalStorageItem('schedule-data');
    const extractedData = JSON.parse(data);
    const dateWithT = formatDate(selected);
    const fullTimestamp = dateWithT + selectedTime;

    if (!extractedData) {
      return toast.error('Applicant details not available!');
    }

    setLoading(true);

    try {
      const response = await generateRemitaRRR({
        amount: 65000,
        payerName: extractedData.email,
        payerEmail: extractedData.email,
        payerPhone: extractedData.phone,
        description: 'Schedule appointment payment',
      });

      if (isRemitaSuccessResponse(response)) {
        const { RRR: rrr, txref } = response;

        if (!rrr) {
          return toast.error('RRR not generated');
        }

        const certificateResponse = await axiosInstance.post(
          '/delivery/schedule-appointment',
          {
            rrr,
            transaction_id: txref,
            is_first_time: stringToBoolean(extractedData.firstTime),
            nin: extractedData.nin,
            delivery_time: fullTimestamp,
            email: extractedData.email,
            phone: extractedData.phone,
            applicant_id: extractedData.applicantID,
            activity_type: extractedData.activity,
          }
        );

        if (
          certificateResponse.status === 200 ||
          certificateResponse.status === 201
        ) {
          const { amount } = certificateResponse.data.data;
          setTxnDetails({ rrr, txref, amount });
          handleRemitaModal();
        }
      } else {
        handleError(response);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col items-center justify-center'>
      <RRRModal
        open={open}
        setOpen={setOpen}
        closeClick={handleRemitaModal}
        txnDetails={txnDetails}
        callbackURL={DashboardRoutes.SCHEDULE}
      />

      <section className='rounded-md border p-5'>
        <Link href='/schedule' className='flex items-center gap-2'>
          <FaRegArrowAltCircleLeft /> <span>Select Date and Time</span>
        </Link>

        <p className='mb-6 mt-2 text-[14px] font-light'>
          Select your preferred date and time below.
        </p>

        <DayPicker
          mode='single'
          selected={selected}
          onSelect={setSelected}
          classNames={{
            today: `border-amber-500`,
            selected: `bg-[#248048] rounded-full text-white`,
            root: `${defaultClassNames.root} p-5`,
            chevron: `fill-[#248048]`,
          }}
          disabled={[
            {
              before: new Date(), // Disable dates before the minimum date
            },
          ]}
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

        <CustomButton
          text='Continue'
          onClick={handleSchedule}
          color='text-white'
          disabledBgColor='opacity-45'
          className='mt-3 w-full !bg-primary py-3'
          disabled={disabledBtn}
        />
      </section>
    </main>
  );
};

export default page;
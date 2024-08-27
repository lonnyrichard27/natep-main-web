'use client';

import { useSearchParams } from 'next/navigation';
import CustomButton from '@/components/Custom/CustomButton';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { verify } from '@/api/user';
import { useReactToPrint } from 'react-to-print';
// import PrintableComponent from '@/components/PrintableComponent';
import axiosInstance from '@/util/axios';
import { convertIsoToDate } from '@/util/formatDate';

const page = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    // @ts-ignore
    content: () => componentRef.current
  });
  const searchParams = useSearchParams();
  const search = searchParams.get('reference');
  // const componentRef = useRef<HTMLDivElement>(null);

  const {
    data: viewReq,
    isLoading,
    error
  } = useQuery({
    queryKey: ['getRef', search],
    queryFn: () => verify(search ?? '')
  });
  
  // console.log(typeof search)
  console.log(viewReq, 'the data');

  const date = viewReq?.createdAt;
  const formattedDate = date.toLocaleDateString('en-CA');

  // Format time as HH:MM AM/PM
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }); // e.g., 5:10 PM

  return (
    <>
    // @ts-ignore
      <div ref={componentRef} className="p-5">
      <div className="text-center mb-7">
        <Image
          src="/images/pdfprintlogo.png"
          alt="nav logo"
          width={150}
          height={150}
          className="w-full"
        />
      </div>

      <div className="border-b border-r border-t bg-[#E4E7EC] border-gray-200 p-4">
        <p className="text-gray-600 font-medium">Appointment Schedule</p>
      </div>
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="grid grid-cols-2 gap-0">
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Tracking ID</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{viewReq?.trackingID}</p>
          </div>

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Date</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{formattedDate}</p>
          </div>

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Time</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{formattedTime}</p>
          </div>

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Activity Type</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{viewReq?.delivery_type}</p>
          </div>

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Address</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{viewReq?.address}</p>
          </div>

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Phone Number</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{viewReq?.phone}</p>
          </div>
        </div>
      </div>

      <div className="border-b border-r border-t mt-7 bg-[#E4E7EC] border-gray-200 p-4">
        <p className="text-gray-600 font-medium">Applicant Details</p>
      </div>
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="grid grid-cols-2 gap-0">

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Applicant ID</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{viewReq?.user_code}</p>
          </div>

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Full Name</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{viewReq?.name}</p>
          </div>

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Email</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{viewReq?.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-6">
        <p className="text-lg font-semibold text-gray-900 mb-4">
          Carefully follow these instructions:
        </p>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>
            Ensure you are the NATEP office at least 30mins before your
            scheduled time.
          </li>
          <li>
            Carry along the following documents for your application:
            <ul className="list-inside list-[lower-alpha] pl-5 space-y-1">
              <li>Appointment Schedule</li>
              <li>Passport Document</li>
              <li>Clear Photograph</li>
              <li>Education Certificates</li>
              <li>Employment Letter</li>
              <li>Police Report</li>
              <li>Medical Report</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <section className="border md:w-[368px] rounded-md p-5 grid items-center justify-center">
          <Image
            src="/images/success.png"
            alt="nav logo"
            width={100}
            height={100}
            className="w-full"
          />
          <article className="text-center">
            <p className="mt-16">Success!</p>
            <p>
              Your appointment schedule has been
              <br /> set successfully. 
              {/* Kindly print your
              <br /> appointment slip below. */}
            </p>
          </article>
          <CustomButton
                text="Print Appointment slip"
                className="w-full mt-3 py-3"
                onClick={handlePrint}
              />

          {/* Button to trigger the print */}
          {/* <ReactToPrint
            trigger={() => (
              <CustomButton
                text="Print Appointment slip"
                className="w-full mt-3 py-3"
              />
            )}
            content={() => componentRef.current}
          /> */}

          {
            // <PrintableComponent
            //   trackingID={tracking_id}
            //   date={created_at}
            //   activityType={activity_type}
            //   address={address}
            //   contactNumber={phone}
            //   fullName={name}
            //   email={email}
            //   />
            }
            {/* // time="9:00 AM"
            // agent={name}
            // applicantID="987654"
            // number="+1 987 654 3210" */}

          <Link href="/" className="mt-2">
            <CustomButton
              text="Go To Home"
              className="w-full mt-3 py-3"
              bgColor="bg-[#F2F4F7]"
              color="text-black"
            />
          </Link>
        </section>
      </main>
    </>
  );
};

export default page;

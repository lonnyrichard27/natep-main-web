'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { verify } from '@/api/user';
import { useReactToPrint } from 'react-to-print';
// import PrintableComponent from '@/components/PrintableComponent';
import axiosInstance from '@/util/axios';
import { convertIsoToDate } from '@/util/formatDate';
import { SuccessImg } from '@/public/assets/images';
import { CustomButton } from '@/components/elements';

const page = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   // @ts-ignore
  //   content: () => componentRef.current
  // });
  const handlePrint = () => {
    if (contentRef.current) {
      const printWindow = window.open('', '', 'height=500,width=800');
      printWindow?.document.write(
        '<html><head><title>Print Content</title></head><body>'
      );
      printWindow?.document.write(contentRef.current.innerHTML);
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
      printWindow?.close();
    }
  };

  const searchParams = useSearchParams();
  const search = searchParams.get('reference');

  const {
    data: viewReq,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getRef', search],
    queryFn: () => verify(search ?? ''),
  });

  // console.log(typeof search)
  console.log(viewReq, 'the data');

  const date = viewReq?.createdAt;
  const formattedDate = date?.toLocaleDateString('en-CA');

  // Format time as HH:MM AM/PM
  const formattedTime = date?.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }); // e.g., 5:10 PM

  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <section className='grid items-center justify-center rounded-md border p-5 md:w-[368px]'>
          <Image
            src={SuccessImg}
            alt='nav logo'
            width={100}
            height={100}
            className='w-full'
          />
          <article className='text-center'>
            <p className='mt-16'>Success!</p>
            <p>
              Your appointment schedule has been
              <br /> set successfully.
              {/* Kindly print your
              <br /> appointment slip below. */}
            </p>
          </article>
          {/* <CustomButton
                text="Print Appointment slip"
                className="w-full mt-3 py-3"
                onClick={handlePrint}
              /> */}

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

          <Link href='/' className='mt-2'>
            <CustomButton
              text='Go To Home'
              className='mt-3 w-full py-3'
              bgColor='bg-[#F2F4F7]'
              color='text-black'
            />
          </Link>
        </section>
      </main>
    </>
  );
};

export default page;

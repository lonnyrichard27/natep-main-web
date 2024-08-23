'use client';

import { useSearchParams } from 'next/navigation';
import CustomButton from '@/components/Custom/CustomButton';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { verify } from '@/api/user';

const page = () => {
    const searchParams = useSearchParams()

    const search = searchParams.get('reference')
    console.log(search)

  //   const { data: viewReq, isLoading, error } = useQuery({
  //     queryKey: ['getRef'],
  //     queryFn: () => verify(search)
  //   });

  // console.log(viewReq, 'the data')

  return (
    <Suspense>
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
              <br /> set successfully. Kindly print your
              <br /> appointment slip below.
            </p>
          </article>
          <Link href="/schedule/schedule-form-3" className="mt-16">
            <CustomButton
              text="Print Appointment slip"
              className="w-full mt-3 py-3"
            />
          </Link>
          <Link href="/schedule/schedule-form-3" className="mt-2">
            <CustomButton
              text="Go To Home"
              className="w-full mt-3 py-3"
              bgColor="bg-[#F2F4F7]"
              color="text-black"
            />
          </Link>
        </section>
      </main>
    </Suspense>
  );
};

export default page;

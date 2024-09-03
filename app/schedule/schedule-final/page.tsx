'use client';

import { useSearchParams } from 'next/navigation';
import CustomButton from '@/components/Custom/CustomButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { verify } from '@/api/user';

const page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('reference');

  const {
    data: viewReq,
    isLoading,
    error
  } = useQuery({
    queryKey: ['getRef', search],
    queryFn: () => verify(search ?? '')
  });

  return (
    <>
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
              <br /> scheduled successfully. An email containing your appointment slip has been sent, please check and print
            </p>
          </article>
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

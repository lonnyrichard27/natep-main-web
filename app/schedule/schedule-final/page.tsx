'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SuccessImg } from '@/public/assets/images';
import { CustomButton } from '@/components/elements';
import { useRouter } from 'next/navigation';


const page = () => {
  const { push } = useRouter()
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
            <p className='mt-10 mb-8 font-semibold text-3xl'>Success!</p>
            <p>Your appointment schedule has been<br /> set successfully.</p>
          </article>
          <Link href='/' className='mt-2'>
            <CustomButton
              text='Go To Home'
              className='mt-3 w-full py-3'
              onClick={() => push('/')}
              color='text-white'
            />
          </Link>
        </section>
      </main>
    </>
  );
};

export default page;

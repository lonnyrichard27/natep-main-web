'use client';

import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosAlert } from 'react-icons/io';
import Image from 'next/image';
import Link from 'next/link';
import { MapImg } from '@/public/assets/images';
import { CustomButton } from '@/components/elements';

const page = () => {
  return (
    <div className='px-3 md:px-20'>
      <div className='my-10 items-center justify-between md:my-0 md:flex'>
        <p className='md:text-2xl'>Certificate List</p>
        <CustomButton
          text='Request Certificate'
          icon={<FiPlusCircle className='text-xl' />}
          onClick={() => console.log('Button clicked')}
          color='text-white'
          className='py-3'
        />
      </div>

      {/* cards */}
      <div className='mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8'>
        <div className='rounded-lg'>
          <Link href='/dashboard/certificates/23'>
            <section className='h-64 rounded-lg bg-greencard bg-cover'>
              <div className='h-full p-10 text-white md:flex md:justify-between'>
                <article className='flex-col'>
                  <p className='text-2xl font-bold'>Digital Certificate</p>
                  <p className='mt-1 w-[20px] text-gray-300'>
                    did:ntep:c40f38a844efa54a4daa8d71cec5a548
                  </p>
                  <div className='mt-14'>
                    <Image src={MapImg} alt='nav logo' width={80} height={80} />
                  </div>
                </article>
                <article>
                  <FaCheckCircle className='text-xl' />
                </article>
              </div>
            </section>
          </Link>
        </div>
        <div className='rounded-lg'>
          <div className='h-64 rounded-lg bg-bluecard bg-cover'>
            <div className='h-full p-10 text-white md:flex md:justify-between'>
              <article className='flex-col'>
                <p className='text-2xl font-bold'>Digital Certificate</p>
                <p className='mt-1 text-gray-300'>
                  did:ntep:c40f38a844efa54a4daa8d71cec5a548
                </p>
                <div className='mt-14'>
                  <Image src={MapImg} alt='nav logo' width={80} height={80} />
                </div>
              </article>
              <article>
                <IoIosAlert className='text-xl' />
              </article>
            </div>
          </div>
        </div>
        <div className='rounded-lg'>
          <div className='h-64 rounded-lg bg-bluecard bg-cover'>
            <div className='h-full p-10 text-white md:flex md:justify-between'>
              <article className='flex-col'>
                <p className='text-2xl font-bold'>Digital Certificate</p>
                <p className='mt-1 text-gray-300'>
                  did:ntep:c40f38a844efa54a4daa8d71cec5a548
                </p>
                <div className='mt-14'>
                  <Image src={MapImg} alt='nav logo' width={80} height={80} />
                </div>
              </article>
              <article>
                <IoIosAlert className='text-xl' />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

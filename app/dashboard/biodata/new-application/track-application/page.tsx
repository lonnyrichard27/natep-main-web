'use client';

import Image from 'next/image';
import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { BsArrowUpRight } from 'react-icons/bs';
import { CustomButton } from '@/components/elements';
const page = () => {
  return (
    <div className="grid justify-center h-screen items-center">
      <section className="border p-16 rounded-2xl">
        <div className="flex justify-center">
          <Image
            src="/images/Docreview.png"
            alt="nav logo"
            width={400}
            height={400}
            className="object-fit"
          />
        </div>
        <p className='font-medium text-xl'>Document Review</p>
        <p className='my-7 text-lg'>
          Your documents will be reviewed and you should get a<br /> feedback within
          48 hours.
        </p>

        <section className="border flex justify-between rounded-2xl p-6">
          <p>Tracking ID</p>
          <article className="flex gap-4 items-center">
            <FiCopy  className='text-[#36BF6D] text-lg' />
            <p>CH44WURIW44W</p>
          </article>
        </section>

        <CustomButton
          text="Track Application"
          onClick={() => console.log('click')}
          color="text-white"
          iconPosition="right"
          icon={<BsArrowUpRight />}
          className="py-6 w-full flex justify-center text-lg text-center mt-5"
        />
      </section>
    </div>
  );
};

export default page;

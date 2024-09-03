'use client';

import CustomButton from '@/components/Custom/CustomButton';
import Image from 'next/image';
import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FaRegArrowAltCircleDown } from 'react-icons/fa';
import { LuMinusCircle } from 'react-icons/lu';
import HeaderNav from '@/components/HeaderNav';
import { useRouter } from 'next/navigation';
import { GuyImg } from '@/public/assets/images';

const page = () => {
  const router = useRouter();
  function route() {
    router.push('/dashboard/certificates');
  }
  return (
    <div className="md:mx-24">
      <HeaderNav onClick={route} title="Digital Certificate" />

      {/* grids */}
      <div className="grid grid-cols-1 mt-7 gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="border p-10 rounded-lg">
          <Image src={GuyImg} height={200} width={200} alt="applicant pic" />
          <article className="mt-10">
            <p className="text-[#98A2B3] text-lg">Title</p>
            <p className="text-xl font-bold">
              {' '}
              Certificate for Talent Export Readiness
            </p>
          </article>

          <article className="my-6">
            <p className="text-[#98A2B3] text-lg">Issue Date</p>
            <p className="text-xl font-bold">01 OCT 2008</p>
          </article>

          <article>
            <p className="text-[#98A2B3] text-lg">Expiry Dateitle</p>
            <p className="text-xl font-bold">01 OCT 2009</p>
          </article>

          <section className="flex mt-10 gap-8">
            <CustomButton
              text="Download PDF"
              icon={<FaRegArrowAltCircleDown className="text-xl" />}
              onClick={() => console.log('Button clicked')}
              color="text-white"
              className="py-3"
            />
            <CustomButton
              text="Hide Details"
              icon={<LuMinusCircle className="text-xl text-black" />}
              onClick={() => console.log('Button clicked')}
              color="text-[#475467]"
              className="py-3"
              bgColor="bg-[#F2F4F7]"
            />
          </section>
        </div>
        <div className="border p-10 rounded-lg">
          <p>Certificate Details</p>
          <article className="mt-10 rounded-lg bg-[#F9FAFB] p-5">
            <p className="text-[#667085] text-lg">SURNAME/nom</p>
            <p className="text-xl font-bold">Abifoluwa</p>
          </article>

          <article className="my-10 rounded-lg bg-[#F9FAFB] p-5">
            <p className="text-[#667085] text-lg">GIVEN NAMES/prénom</p>
            <p className="text-xl font-bold">Aanuoluwakiishi, Tolu</p>
          </article>

          <article className="my-10 rounded-lg bg-[#F9FAFB] p-5">
            <p className="text-[#667085] text-lg">ADDRESS</p>
            <p className="text-xl font-bold">Ojuelegba</p>
          </article>

          <article className="my-10 flex gap-8">
            <article className="rounded-lg bg-[#F9FAFB] w-full p-5">
              <p className="text-[#667085] text-lg">PASSPORT NUMBER</p>
              <p className="text-xl font-bold">B123456789</p>
            </article>
            <article className="rounded-lg bg-[#F9FAFB] w-full p-5">
              <p className="text-[#667085] text-lg">CERTIFICATE ID</p>
              <p className="text-xl font-bold">00000000000</p>
            </article>
          </article>
        </div>
      </div>
    </div>
  );
};

export default page;

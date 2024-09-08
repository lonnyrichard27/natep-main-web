'use client';

import CustomButton from '@/components/Custom/CustomButton';
import HeaderNav from '@/components/HeaderNav';
import React from 'react';
import { LuPrinter } from 'react-icons/lu';
import BasicDetailsCard from '@/components/BasicDetailsCard';
import Badge from '@/components/Badge';
import { GoPaperclip } from 'react-icons/go';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter()
  const complete = () => {
    router.push('/dashboard/new-application/track-application')
  }
  return (
    <div className="md:mx-[204px] mx-8 md:my-[78px] my-10">
      <section className="md:flex justify-between">
        <article>
          <HeaderNav title="Biodata Preview" />
        </article>
        <article className="md:flex gap-5">
          <CustomButton
            text="Print Biodata"
            icon={<LuPrinter className="md:text-lg text-sm" />}
            onClick={() => console.log('click')}
            color="text-primary"
            className="py-4 md:px-10  mt-5 md:mt-0"
            bgColor="bg-[#EBF9F0]"
          />
          <CustomButton
            text="Confirm Submission"
            onClick={complete}
            color="text-white"
            className="py-3 mt-5 md:mt-0"
          />
        </article>
      </section>

      {/* main section */}
      <main className="mt-7">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          <section>
            <div className="rounded-lg border md:p-20 p-4">
              <p className="text-xl font-light text-[#98A2B3]">Basic Details</p>
              <BasicDetailsCard mainText="SURNAME/nom" subText="Abifoluwa" />
              <BasicDetailsCard
                mainText="GIVEN NAMES/prénom"
                subText="Aanuoluwakiishi, Tolu"
              />
              <BasicDetailsCard
                mainText="Address"
                subText="BOI House, Plot 256, Zone A O Off Herbert Macaulay Way,Central Business District, Abuja."
              />
              <section className="md:flex gap-5">
                <BasicDetailsCard
                  mainText="EMAIL ADDRESS"
                  subText="abifoluwa@gmail.com"
                />
                <BasicDetailsCard
                  mainText="PHONE NUMBER"
                  subText="08123456789"
                />
              </section>
              <section className="md:flex gap-5">
                <BasicDetailsCard mainText="NIN" subText="12345678910" />
                <BasicDetailsCard
                  mainText="PASSPORT NUMBER"
                  subText="B123456789"
                />
              </section>
            </div>
            <div className="rounded-lg border md:p-20 p-4 mt-5">
              <p className="text-xl font-light text-[#98A2B3]">
                Basic Documents Uploads
              </p>
              <Badge
                title="Passport"
                leftIcon={<GoPaperclip />}
                bgColor="bg-[#F2F4F7]"
                textColor="text-black"
                className="max-w-xs"
              />

              <Badge
                title="Photograph"
                leftIcon={<GoPaperclip />}
                bgColor="bg-[#F2F4F7]"
                textColor="text-black"
                className="max-w-xs"
              />
              <Badge
                title="Education Certificate"
                leftIcon={<GoPaperclip />}
                bgColor="bg-[#F2F4F7]"
                textColor="text-black"
                className="max-w-xs"
              />
              <Badge
                title="Employment Offer"
                leftIcon={<GoPaperclip />}
                bgColor="bg-[#F2F4F7]"
                textColor="text-black"
                className="max-w-xs"
              />
              <Badge
                title="Police Report"
                leftIcon={<GoPaperclip />}
                bgColor="bg-[#F2F4F7]"
                textColor="text-black"
                className="max-w-xs"
              />
              <Badge
                title="Medical Report"
                leftIcon={<GoPaperclip />}
                bgColor="bg-[#F2F4F7]"
                textColor="text-black"
                className="max-w-xs"
              />
            </div>
          </section>
          <section>
            <div className="rounded-lg border md:p-10 p-4">
              <p className="text-xl font-light text-[#98A2B3]">
                Education Details
              </p>
              <BasicDetailsCard mainText="SURNAME/nom" subText="Abifoluwa" />
              <BasicDetailsCard
                mainText="Highest Level"
                subText="Aanuoluwakiishi, Tolu"
              />
              <BasicDetailsCard mainText="Institution" subText="00000000000" />
            </div>
            <div className="rounded-lg border md:p-14 p-4 my-7">
              <p className="text-xl font-light text-[#98A2B3]">
                Employment Details
              </p>
              <BasicDetailsCard mainText="SURNAME/nom" subText="Abifoluwa" />
              <BasicDetailsCard
                mainText="Company Name"
                subText="Aanuoluwakiishi, Tolu"
              />
              <BasicDetailsCard
                mainText="ADDRESS"
                subText="BOI House, Plot 256, Zone A O Off Herbert Macaulay Way,Central Business District, Abuja."
              />
              <section className="md:flex gap-5">
                <BasicDetailsCard mainText="State" subText="Abuja" />
                <BasicDetailsCard mainText="Country" subText="08123456789" />
              </section>
            </div>
            <div className="rounded-lg border md:p-10 p-4">
              <p className="text-xl font-light text-[#98A2B3]">
                Police Details
              </p>
              <BasicDetailsCard
                mainText="POSSAP Number"
                subText="0080806797687"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default page;

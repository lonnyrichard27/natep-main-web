'use client';

import { CustomButton } from '@/components/elements';
import { Wrapper } from '@/components/Navigation';
import Footer from '@/components/Navigation/Footer';
import Navbar from '@/components/Navigation/Navbar';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import AppointmentCalendar from '@/components/svgs/AppointmentCalendar';
import PhoneSvg from '@/components/svgs/PhoneSvg';
import PlayStore from '@/components/svgs/PlayStore';
import PortalSvg from '@/components/svgs/PortalSvg';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@material-tailwind/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaApple } from 'react-icons/fa';
import { HiMinus, HiPlus } from 'react-icons/hi';

export default function Home() {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: React.SetStateAction<number>) =>
    setOpen(open === value ? 0 : value);

  const core_values = [
    {
      header: 'What documents do I need to get started?',
      body: (
        <div>
          <p>
            Bring along the following documents for your application processing:
          </p>
          <ul className='mt-2 !list-decimal pl-5'>
            <li>Appointment Slip</li>
            <li>International Passport Document</li>
            <li>Clear Passport Photograph</li>
            <li>All Academic Certificates</li>
            <li>Employment Letter</li>
            <li>Police Report</li>
            <li>Medical Report</li>
          </ul>
        </div>
      ),
    },
    {
      header: 'How do I make payment?',
      body: 'All applicants are required to make a payment of 65,000 Naira via the Remita channel.',
    },
    {
      header: 'How long will it take to get my STEER Certificate?',
      body: 'Reviewing your application documents and issuing your sealed STEER Certificate will take a minimum of 5 working days.',
    },
    {
      header: 'I need help, what are your support channels?',
      body: 'For any help and assistance, please send us an email help@natep.gov.ng.',
    },
  ];

  return (
    <>
      <Navbar />
      {/* HERO SECTION */}
      <section className='relative h-[611px] bg-bg_image bg-cover bg-no-repeat'>
        <div className='absolute inset-0 bg-gray-900/75 sm:bg-transparent'></div>

        <div className='relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:px-8'>
          <div className='max-w-xl ltr:sm:text-left rtl:sm:text-right'>
            <h1 className='text-3xl font-extrabold text-white sm:text-5xl'>
              Verification in three Simple Steps
            </h1>

            <p className='mt-4 max-w-lg text-white sm:text-xl/relaxed'>
              Securely enter your NIN and/or Passport details. Take a quick
              selfie for facial recognition.
            </p>
          </div>
        </div>
      </section>

      {/* grid */}
      <section className='bg-[#F2F4F7]'>
        <Wrapper>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8'>
            <div className='flex flex-col items-center justify-center rounded-md bg-white px-10 py-10 shadow'>
              <span className='flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF9F0]'>
                <AppointmentCalendar />
              </span>
              <p className='my-10 text-center font-light text-[#666666]'>
                Schedule an appointment to <br />
                register with a field agent.
              </p>
              <Link href='/schedule'>
                <CustomButton text='Schedule Appointment' />
              </Link>
            </div>

            <div className='flex max-w-sm flex-col items-center justify-center rounded-md bg-white py-10 shadow'>
              <span className='flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF9F0]'>
                <PortalSvg />
              </span>
              <p className='my-10 text-center font-light text-[#666666]'>
                Access the web portal to request
                <br /> your NATEP Certificate.
              </p>
              <Link href={DashboardRoutes.LOGIN}>
                <CustomButton text='Login / Register' />
              </Link>
            </div>

            <div className='flex max-w-sm flex-col items-center justify-center rounded-md bg-white py-10 shadow'>
              <span className='flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF9F0]'>
                <PhoneSvg />
              </span>
              <p className='my-10 text-center font-light text-[#666666]'>
                Manage your digital certificate
                <br /> with the NATEP App today.
              </p>
              <div className='mx-4 flex gap-4'>
                <button className='inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-8 py-3 text-black focus:outline-none'>
                  <PlayStore />
                  <span className='text-sm font-medium'> Google Play </span>
                </button>

                <button className='inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-8 py-3 text-black focus:outline-none'>
                  <FaApple />
                  <span className='text-sm font-medium'> Apple Store </span>
                </button>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>

      {/* FAQs */}
      <Wrapper className='flex flex-col items-center justify-center gap-10 p-4'>
        <article className='text-center'>
          <p className='mb-6 text-3xl font-bold'>Got Questions?</p>
          <p>We have compiled our most frequent questions and answers here.</p>
        </article>

        <div className='max-w-[820px]'>
          {core_values?.map((item, index) => (
            <Accordion
              key={index}
              open={open === index + 1}
              className={`mb-4 rounded-md bg-background-gray px-6 !text-black ${open === index + 1 ? '' : ''}`}
              icon={
                open === index + 1 ? (
                  <HiMinus className='text-[#2B9957]' />
                ) : (
                  <HiPlus className='text-[#2B9957]' />
                )
              }
            >
              <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className={`border-b-0 text-base font-bold !text-black ${
                  open === index + 1 ? '' : ''
                }`}
              >
                {item?.header}
              </AccordionHeader>
              <AccordionBody className='pt-0 text-base font-normal !leading-[25px] !text-black'>
                {item?.body}
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </Wrapper>

      <Footer />
    </>
  );
}

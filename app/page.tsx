import { CustomButton } from '@/components/elements';
import Footer from '@/components/Navigation/Footer';
import Navbar from '@/components/Navigation/Navbar';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import AppointmentCalendar from '@/components/svgs/AppointmentCalendar';
import PhoneSvg from '@/components/svgs/PhoneSvg';
import PlayStore from '@/components/svgs/PlayStore';
import PortalSvg from '@/components/svgs/PortalSvg';
import Link from 'next/link';
import { FaApple } from 'react-icons/fa';

export default function Home() {
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
      <section className='grid items-center justify-center bg-[#F2F4F7] p-4 md:p-[161px]'>
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
      </section>

      {/* FAQs */}
      <div className='grid items-center justify-center p-4 md:p-[141px]'>
        <article className='text-center'>
          <p className='text-3xl font-bold'>Got Questions?</p>
          <p className='my-5'>
            We have compiled our most frequent questions and answers here.
          </p>
        </article>
        <div className='space-y-4'>
          <details
            className='group bg-[#F2F4F7] [&_summary::-webkit-details-marker]:hidden'
            open
          >
            <summary className='flex cursor-pointer items-center justify-between gap-96 rounded-lg bg-gray-50 p-4 text-gray-900'>
              <h2 className='font-medium'>Question 1?</h2>
              <svg
                className='size-5 shrink-0 transition duration-300 group-open:-rotate-180'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </summary>
            <p className='mt-4 p-4 leading-relaxed text-gray-700'>Answer</p>
          </details>

          <details
            className='group bg-[#F2F4F7] [&_summary::-webkit-details-marker]:hidden'
            open
          >
            <summary className='flex cursor-pointer items-center justify-between gap-96 rounded-lg bg-gray-50 p-4 text-gray-900'>
              <h2 className='font-medium'>Question 1?</h2>
              <svg
                className='size-5 shrink-0 transition duration-300 group-open:-rotate-180'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </summary>
            <p className='mt-4 p-4 leading-relaxed text-gray-700'>Answer</p>
          </details>

          <details
            className='group bg-[#F2F4F7] [&_summary::-webkit-details-marker]:hidden'
            open
          >
            <summary className='flex cursor-pointer items-center justify-between gap-96 rounded-lg bg-gray-50 p-4 text-gray-900'>
              <h2 className='font-medium'>Question 1?</h2>
              <svg
                className='size-5 shrink-0 transition duration-300 group-open:-rotate-180'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </summary>
            <p className='mt-4 p-4 leading-relaxed text-gray-700'>Answer</p>
          </details>

          <details
            className='group bg-[#F2F4F7] [&_summary::-webkit-details-marker]:hidden'
            open
          >
            <summary className='flex cursor-pointer items-center justify-between gap-96 rounded-lg bg-gray-50 p-4 text-gray-900'>
              <h2 className='font-medium'>Question 1?</h2>
              <svg
                className='size-5 shrink-0 transition duration-300 group-open:-rotate-180'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </summary>
            <p className='mt-4 p-4 leading-relaxed text-gray-700'>Answer</p>
          </details>

          <details
            className='group bg-[#F2F4F7] [&_summary::-webkit-details-marker]:hidden'
            open
          >
            <summary className='flex cursor-pointer items-center justify-between gap-96 rounded-lg bg-gray-50 p-4 text-gray-900'>
              <h2 className='font-medium'>Question 1?</h2>
              <svg
                className='size-5 shrink-0 transition duration-300 group-open:-rotate-180'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </summary>
            <p className='mt-4 p-4 leading-relaxed text-gray-700'>Answer</p>
          </details>
        </div>
      </div>

      <Footer />
    </>
  );
}

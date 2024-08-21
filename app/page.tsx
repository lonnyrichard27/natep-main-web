import CustomButton from '@/components/Custom/CustomButton';
import Footer from '@/components/Navigation/Footer';
import Navbar from '@/components/Navigation/Navbar';
import AppointmentCalendar from '@/components/svgs/AppointmentCalendar';
import PhoneSvg from '@/components/svgs/PhoneSvg';
import PlayStore from '@/components/svgs/PlayStore';
import PortalSvg from '@/components/svgs/PortalSvg';
import Image from 'next/image';
import Link from 'next/link';
import { FaApple } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

export default function Home() {

  return (
    <>
      <Navbar />
      {/* HERO SECTION */}
      <section className="relative bg-bg_image bg-cover h-[611px] bg-no-repeat">
        <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:px-8">
          <div className="max-w-xl ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
              Verification in three Simple Steps
            </h1>

            <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
              Securely enter your NIN and/or Passport details. Take a quick
              selfie for facial recognition.
            </p>
          </div>
        </div>
      </section>

      {/* grid */}
      <section className="bg-[#F2F4F7] grid items-center justify-center p-4 md:p-[161px]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="bg-white shadow rounded-md flex flex-col py-10 px-10 justify-center items-center">
            <span className="h-16 w-16 bg-[#EBF9F0] flex items-center justify-center rounded-full">
              <AppointmentCalendar />
            </span>
            <p className="text-center my-10 text-[#666666] font-light">
              Schedule an appointment to <br />
              register with a field agent.
            </p>
            <Link href='/schedule'>
              <CustomButton text="Schedule Appointment" />
            </Link>
          </div>
          <div className="bg-white shadow rounded-md flex flex-col max-w-sm py-10 justify-center items-center">
            <span className="h-16 w-16 bg-[#EBF9F0] flex items-center justify-center rounded-full">
              <PortalSvg />
            </span>
            <p className="text-center my-10 text-[#666666] font-light">
              Access the web portal to request
              <br /> your NATEP Certificate.
            </p>
            <Link href='/auth/login'>
              <CustomButton text="Login / Register" />
            </Link>
          </div>
          <div className="bg-white shadow rounded-md flex flex-col max-w-sm py-10 justify-center items-center">
            <span className="h-16 w-16 bg-[#EBF9F0] flex items-center justify-center rounded-full">
              <PhoneSvg />
            </span>
            <p className="text-center my-10 text-[#666666] font-light">
              Manage your digital certificate
              <br /> with the NATEP App today.
            </p>
            <div className="flex gap-4 mx-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-8 py-3 text-black focus:outline-none">
                <PlayStore />
                <span className="text-sm font-medium"> Google Play </span>
              </button>

              <button className="inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-8 py-3 text-black focus:outline-none">
                <FaApple />
                <span className="text-sm font-medium"> Apple Store </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <div className="grid items-center justify-center p-4 md:p-[141px]">
        <article className="text-center">
          <p className='text-3xl font-bold'>Got Questions?</p>
          <p className='my-5'>We have compiled our most frequent questions and answers here.</p>
        </article>
        <div className="space-y-4">
          <details
            className="group [&_summary::-webkit-details-marker]:hidden bg-[#F2F4F7]"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-96 rounded-lg bg-gray-50 p-4 text-gray-900">
              <h2 className="font-medium">Question 1?</h2>
              <svg
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="mt-4 p-4 leading-relaxed text-gray-700">Answer</p>
          </details>

          <details
            className="group [&_summary::-webkit-details-marker]:hidden bg-[#F2F4F7]"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-96 rounded-lg bg-gray-50 p-4 text-gray-900">
              <h2 className="font-medium">Question 1?</h2>
              <svg
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="mt-4 p-4 leading-relaxed text-gray-700">Answer</p>
          </details>

          <details
            className="group [&_summary::-webkit-details-marker]:hidden bg-[#F2F4F7]"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-96 rounded-lg bg-gray-50 p-4 text-gray-900">
              <h2 className="font-medium">Question 1?</h2>
              <svg
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="mt-4 p-4 leading-relaxed text-gray-700">Answer</p>
          </details>

          <details
            className="group [&_summary::-webkit-details-marker]:hidden bg-[#F2F4F7]"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-96 rounded-lg bg-gray-50 p-4 text-gray-900">
              <h2 className="font-medium">Question 1?</h2>
              <svg
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="mt-4 p-4 leading-relaxed text-gray-700">Answer</p>
          </details>

          <details
            className="group [&_summary::-webkit-details-marker]:hidden bg-[#F2F4F7]"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-96 rounded-lg bg-gray-50 p-4 text-gray-900">
              <h2 className="font-medium">Question 1?</h2>
              <svg
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="mt-4 p-4 leading-relaxed text-gray-700">Answer</p>
          </details>
        </div>
      </div>

      <Footer />
    </>
  );
}

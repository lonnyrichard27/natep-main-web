import { CustomButton } from '@/components/elements';
import StepList from '@/components/StepList';
import {
  BiometricSvg,
  CrossSvg,
  DocumentSvg,
  EmploymentSvg,
  IDCard,
  LocationSvg,
  Passport,
  Photograph,
  ShieldSvg,
} from '@/components/svgs';
import Link from 'next/link';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { IoCheckmarkCircle } from 'react-icons/io5';

const page = () => {
  const steps = [
    {
      title: 'Verify NIN',
      subtitle: 'National Identification Number',
      icon: <IDCard />,
      completed: <IoCheckmarkCircle className='h-5 w-5 text-[#2B9957]' />,
      isCompleted: true,
    },
    {
      title: 'Biometrics',
      subtitle: 'Scan your passport',
      icon: <BiometricSvg />,
      completed: <IoCheckmarkCircle className='h-5 w-5 text-[#2B9957]' />,
      isCompleted: true,
    },
    {
      title: 'Passport',
      subtitle: 'Scan your passport',
      icon: <Passport />,
      completed: <IoCheckmarkCircle className='h-5 w-5 text-[#2B9957]' />,
      isCompleted: true,
    },
    {
      title: 'Photograph',
      subtitle: 'Upload recent photograph',
      icon: <Photograph />,
      isCompleted: false,
      otherIcon: <FiChevronRight />,
    },
    {
      title: 'Address',
      subtitle: 'Input delivery address',
      icon: <LocationSvg />,
      isCompleted: false,
      otherIcon: <FiChevronRight />,
    },
    {
      title: 'Photograph',
      subtitle: 'Upload recent photograph',
      icon: <Photograph />,
      isCompleted: false,
      otherIcon: <FiChevronRight className='text-black' />,
    },
    {
      title: 'Education',
      subtitle: 'Scan your certifications',
      icon: <DocumentSvg />,
      isCompleted: false,
      otherIcon: <FiChevronRight className='text-black' />,
    },
    {
      title: 'Employment',
      subtitle: 'Input Employer Details',
      icon: <EmploymentSvg />,
      isCompleted: false,
      otherIcon: <FiChevronRight className='text-black' />,
    },
    {
      title: 'Police Report',
      subtitle: 'Request police report',
      icon: <ShieldSvg />,
      isCompleted: false,
      otherIcon: <FiChevronRight className='text-black' />,
    },
    {
      title: 'Medical Report',
      subtitle: 'Scan medical report',
      icon: <CrossSvg />,
      isCompleted: false,
      otherIcon: <FiChevronRight className='text-black' />,
    },
  ];
  return (
    <div className='grid h-screen items-center justify-center'>
      <section className='rounded-lg border p-3 md:p-10'>
        <p className='text-[16px] font-semibold'>Complete your Biodata (2/8)</p>
        <p className='my-3 text-sm md:text-lg'>
          You need to complete your biodata in order to request for your
          <br /> NATEP Certificate.
        </p>
        {steps.map((step, index) => (
          <StepList
            key={index}
            icon={step.icon}
            title={step.title}
            subtitle={step.subtitle}
            completed={step.completed}
            isCompleted={step.isCompleted}
            otherIcon={step.otherIcon}
          />
        ))}
        <Link href='/dashboard/biodata/application'>
          <CustomButton text='Continue' className='mt-4 w-full' />
        </Link>
      </section>
    </div>
  );
};

export default page;

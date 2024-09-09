'use client'

import StepList from '@/components/StepList'
import React, { useEffect, useMemo, useState } from 'react'
import {
  BiometricSvg,
  CrossSvg,
  DocumentSvg,
  EmploymentSvg,
  IDCard,
  LocationSvg,
  Passport,
  Photograph,
  ShieldSvg
} from '@/components/svgs';
import { useRouter } from 'next/navigation';
import { getUserProfile } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { link } from 'fs';

const page = () => {

  const { data: applicant, isLoading: applicantLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile
  });

  console.log(applicant);

  useEffect(() => {
    const storeTrackingid = () => {
      const tracking = localStorage.setItem('tracking_id', applicant?.tracking_id)
      return tracking
    }

    storeTrackingid();
  }, [])
  

  const oneApplicant = useMemo(() => { return applicant }, [applicant]);

  const steps = [
    {
      title: 'Verify NIN',
      subtitle: 'National Identification Number',
      icon: <IDCard />,
      isCompleted: true,
      name: 'verify_NIN'
    },
    {
      title: 'Biometrics',
      subtitle: 'Complete your biometrics',
      icon: <BiometricSvg />,
      isCompleted: true,
      name: 'biometrics'
    },
    {
      title: 'Passport',
      subtitle: 'Scan your passport',
      icon: <Passport />,
      isCompleted: oneApplicant?.has_scanned_passport === 1,
      name: 'passport',
      link: '/dashboard/biodata/new-application'
    },
    {
      title: 'Photograph',
      subtitle: 'Upload recent photograph',
      icon: <Photograph />,
      isCompleted: oneApplicant?.has_photograph === 1,
      name: 'photograph',
      link: '/dashboard/biodata/new-application/photograph'
    },
    {
      title: 'Address',
      subtitle: 'Input delivery address',
      icon: <LocationSvg />,
      isCompleted: oneApplicant?.has_address === 1,
      name: 'address',
      link: '/dashboard/biodata/new-application/address'
    },
    {
      title: 'Education',
      subtitle: 'Scan your certifications',
      icon: <DocumentSvg />,
      isCompleted: oneApplicant?.has_education === 1,
      name: 'education',
      link: '/dashboard/biodata/new-application/education'
    },
    {
      title: 'Employment',
      subtitle: 'Input Employer Details',
      icon: <EmploymentSvg />,
      isCompleted: oneApplicant?.has_employment === 1,
      name: 'employment',
      link: '/dashboard/biodata/new-application/employment'
    },
    {
      title: 'Police Report',
      subtitle: 'Request police report',
      icon: <ShieldSvg />,
      isCompleted: oneApplicant?.has_police_report === 1,
      name: 'police_Report',
      link: '/dashboard/biodata/new-application/police-report'
    },
    {
      title: 'Medical Report',
      subtitle: 'Scan medical report',
      icon: <CrossSvg />,
      isCompleted: oneApplicant?.has_medicals === 1,
      name: 'medical_report',
      link: '/dashboard/biodata/new-application/medical_report'
    }
  ];

  const has_item_count = steps?.filter((step) => step.isCompleted == true).length;
  
  return (
    <>
    <div className='grid justify-center'>
      <section className='col-span-5 h-fit rounded-lg border p-10'>
        <p className='text-lg font-semibold'>
          Applicant Biodata ({has_item_count}/{steps?.length})
        </p>
        <p className='my-5'> You need to complete your application in order to request for your NATEP Certificate.</p>

        {steps.map((step, index) => (
          <StepList
            key={index}
            icon={step.icon}
            title={step.title}
            subtitle={step.subtitle}
            isCompleted={step.isCompleted}
            link={step.link}
          />
        ))}
      </section>
    </div>
  </>
  )
}


export default page
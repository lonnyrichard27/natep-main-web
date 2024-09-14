'use client'

import StepList from '@/components/StepList'
import React, { useEffect, useMemo } from 'react'
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
import { getUserProfile } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

const page = () => {
  const { data: applicant, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile
  });

  useEffect(() => {
    const storeTrackingid = () => {
      const tracking = localStorage.setItem('tracking_id', applicant?.tracking_id)
      return tracking
    }

    storeTrackingid();
  }, [applicant])
  

  const oneApplicant = useMemo(() => { return applicant }, [applicant]);

  const queryHeaders = oneApplicant?.bio_query?.query_headers ?? [];

  const steps = [
    {
      title: 'Verify NIN',
      subtitle: 'National Identification Number',
      icon: <IDCard />,
      isCompleted: true
    },
    {
      title: 'Biometrics',
      subtitle: 'SComplete your biometrics',
      icon: <BiometricSvg />,
      isCompleted: true
    },
    {
      title: 'Passport',
      subtitle: 'Scan your passport',
      icon: <Passport />,
      isCompleted: oneApplicant?.has_scanned_passport === 1,
      isQueried: queryHeaders.includes('scanned_passport'),
      name: 'passport',
      link: queryHeaders.includes('scanned_passport')
        ? '/dashboard/quick-action/update-application/passport'
        : ''
    },
    {
      title: 'Photograph',
      subtitle: 'Upload recent photograph',
      icon: <Photograph />,
      isCompleted: oneApplicant?.bio_data?.photography?.has_photography,
      name: 'photograph',
      isQueried: queryHeaders.includes('photograph'),
      link: queryHeaders.includes('photograph')
        ? '/dashboard/quick-action/update-application/photograph'
        : ''
    },
    {
      title: 'Address',
      subtitle: 'Input delivery address',
      icon: <LocationSvg />,
      isCompleted: oneApplicant?.bio_data?.address?.has_address === 1,
      name: 'address',
      isQueried: queryHeaders.includes('address'),
      link: queryHeaders.includes('address')
        ? '/dashboard/quick-action/update-application/address'
        : ''
    },
    {
      title: 'Education',
      subtitle: 'Scan your certifications',
      icon: <DocumentSvg />,
      isCompleted: oneApplicant?.has_education === 1,
      name: 'education',
      isQueried: queryHeaders.includes('education'),
      link: queryHeaders.includes('education')
        ? '/dashboard/quick-action/update-application/education'
        : ''
    },
    {
      title: 'Employment',
      subtitle: 'Input Employer Details',
      icon: <EmploymentSvg />,
      isCompleted: oneApplicant?.has_employment === 1,
      name: 'employment',
      isQueried: queryHeaders.includes('employment'),
      link: queryHeaders.includes('employment')
        ? '/dashboard/quick-action/update-application/employment'
        : ''
    },
    {
      title: 'Police Report',
      subtitle: 'Request police report',
      icon: <ShieldSvg />,
      isCompleted: oneApplicant?.has_police_report === 1,
      name: 'police_Report',
      isQueried: queryHeaders.includes('police_report'),
      link: queryHeaders.includes('police_report')
        ? '/dashboard/quick-action/update-application/police-report'
        : ''
    },
    {
      title: 'Medical Report',
      subtitle: 'Scan medical report',
      icon: <CrossSvg />,
      isCompleted: oneApplicant?.has_medicals === 1,
      name: 'medical_report',
      isQueried: queryHeaders.includes('medicals'),
      link: queryHeaders.includes('medicals')
        ? '/dashboard/quick-action/update-application/medical_report'
        : ''
    },
  ];

  const has_item_count = steps?.filter((step) => step.isCompleted == true).length;
  
  return (
    <>
    {isLoading ? 
      <div className='flex justify-center items-center'>
        <p>Loading Application Details.....</p>
      </div>
    : 
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
            isQueried={step.isQueried}
          />
        ))}
        </section>
      </div>
    }
  </>
  )
}


export default page
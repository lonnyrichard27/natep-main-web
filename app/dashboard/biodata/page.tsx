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
      link: oneApplicant?.has_scanned_passport === 1 ? '/dashboard/biodata/update-application/passport' : '/dashboard/biodata/new-application/passport'
    },
    {
      title: 'Photograph',
      subtitle: 'Upload recent photograph',
      icon: <Photograph />,
      isCompleted: oneApplicant?.photograph,
      name: 'photograph',
      link: oneApplicant?.photograph ? '/dashboard/biodata/update-application/photograph' : '/dashboard/biodata/new-application/photograph'
    },
    {
      title: 'Address',
      subtitle: 'Input delivery address',
      icon: <LocationSvg />,
      isCompleted: oneApplicant?.address,
      name: 'address',
      link: oneApplicant?.address ? '/dashboard/biodata/update-application/address' : '/dashboard/biodata/new-application/address'
    },
    {
      title: 'Education',
      subtitle: 'Scan your certifications',
      icon: <DocumentSvg />,
      isCompleted: oneApplicant?.has_education === 1,
      name: 'education',
      link: oneApplicant?.has_education === 1 ? '/dashboard/biodata/update-application/education' : '/dashboard/biodata/new-application/education'
    },
    {
      title: 'Employment',
      subtitle: 'Input Employer Details',
      icon: <EmploymentSvg />,
      isCompleted: oneApplicant?.has_employment === 1,
      name: 'employment',
      link: oneApplicant?.has_employment === 1 ? '/dashboard/biodata/update-application/employment' : '/dashboard/biodata/new-application/employment'
    },
    {
      title: 'Police Report',
      subtitle: 'Request Police Report',
      icon: <ShieldSvg />,
      isCompleted: oneApplicant?.has_police_report === 1,
      name: 'police_Report',
      link: oneApplicant?.has_police_report === 1 ? '/dashboard/biodata/update-application/police-report' : '/dashboard/biodata/new-application/police-report'
    },
    {
      title: 'Medical Report',
      subtitle: 'Scan Medical Report',
      icon: <CrossSvg />,
      isCompleted: oneApplicant?.has_medicals === 1,
      name: 'medical_report',
      link: oneApplicant?.has_medicals === 1 ? '/dashboard/biodata/update-application/medical_report' : '/dashboard/biodata/new-application/medical_report'
    }
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
            />
          ))}
        </section>
      </div>
    }
  </>
  )
}


export default page
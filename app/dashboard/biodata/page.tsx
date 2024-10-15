'use client';

import StepList from '@/components/StepList';
import React, { useEffect, useMemo, useState } from 'react';
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
import { getUserProfile } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { PageLoader } from '@/components/Navigation';
import Image from 'next/image';
import { CustomButton } from '@/components/elements';
import { BsArrowUpRight } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import CopyIcon from '@/components/CopyIcon';
import { useRouter } from 'next/navigation';



const page = () => {
  const { push } = useRouter();
  const [tracking, setTracking] = useState<string>('');

  const { data: applicant, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile
  })

  useEffect(() => {
    const getTrackingId = () => {
      const trackingId = localStorage?.getItem('tracking_id') ?? '';
      setTracking(trackingId);
    };
    getTrackingId();
  }, []);

  const oneApplicant = useMemo(() => {
    return applicant;
  }, [applicant]);

  const queryHeaders = oneApplicant?.bio_query?.query_headers ?? [];

  const steps = [
    {
      title: 'Verify NIN',
      subtitle: 'National Identification Number',
      icon: <IDCard />,
      isCompleted: true,
    },
    {
      title: 'Biometrics',
      subtitle: 'SComplete your biometrics',
      icon: <BiometricSvg />,
      isCompleted: true,
    },
    {
      title: 'Passport',
      subtitle: 'Scan your passport',
      icon: <Passport />,
      isCompleted: oneApplicant?.has_scanned_passport === 1,
      isQueried: queryHeaders.includes('scanned_passport'),
      name: 'passport',
      link: queryHeaders.includes('scanned_passport')
        ? '/dashboard/biodata/update-application/passport'
        : oneApplicant?.has_scanned_passport === 1
          ? ''
          : '/dashboard/biodata/new-application/passport',
    },
    {
      title: 'Photograph',
      subtitle: 'Upload recent photograph',
      icon: <Photograph />,
      isCompleted: oneApplicant?.bio_data?.photography?.has_photography === 1,
      name: 'photograph',
      isQueried: queryHeaders.includes('photograph'),
      link: queryHeaders.includes('photograph')
        ? '/dashboard/biodata/update-application/photograph'
        : oneApplicant?.bio_data?.photography?.has_photography === 1
          ? ''
          : '/dashboard/biodata/new-application/photograph',
    },
    {
      title: 'Address',
      subtitle: 'Input delivery address',
      icon: <LocationSvg />,
      isCompleted: oneApplicant?.bio_data?.address?.has_address === 1,
      name: 'address',
      isQueried: queryHeaders.includes('address'),
      link: queryHeaders.includes('address')
        ? '/dashboard/biodata/update-application/address'
        : oneApplicant?.bio_data?.address?.has_address === 1
          ? ''
          : '/dashboard/biodata/new-application/address',
    },
    {
      title: 'Education',
      subtitle: 'Scan your certifications',
      icon: <DocumentSvg />,
      isCompleted: oneApplicant?.has_education === 1,
      name: 'education',
      isQueried: queryHeaders.includes('education'),
      link: queryHeaders.includes('education')
        ? '/dashboard/biodata/update-application/education'
        : oneApplicant?.has_education === 1
          ? ''
          : '/dashboard/biodata/new-application/education',
    },
    {
      title: 'Employment',
      subtitle: 'Input Employer Details',
      icon: <EmploymentSvg />,
      isCompleted: oneApplicant?.has_employment === 1,
      name: 'employment',
      isQueried: queryHeaders.includes('employment'),
      link: queryHeaders.includes('employment')
        ? '/dashboard/biodata/update-application/employment'
        : oneApplicant?.has_employment === 1
          ? ''
          : '/dashboard/biodata/new-application/employment',
    },
    {
      title: 'Police Report',
      subtitle: 'Request police report',
      icon: <ShieldSvg />,
      isCompleted: oneApplicant?.has_police_report === 1,
      name: 'police_Report',
      isQueried: queryHeaders.includes('police_report'),
      link: queryHeaders.includes('police_report')
        ? '/dashboard/biodata/update-application/police-report'
        : oneApplicant?.has_police_report === 1
          ? ''
          : '/dashboard/biodata/new-application/police-report',
    },
    {
      title: 'Medical Report',
      subtitle: 'Scan medical report',
      icon: <CrossSvg />,
      isCompleted: oneApplicant?.has_medicals === 1,
      name: 'medical_report',
      isQueried: queryHeaders.includes('medicals'),
      link: queryHeaders.includes('medicals')
        ? '/dashboard/biodata/update-application/medical_report'
        : oneApplicant?.has_medicals === 1
          ? ''
          : '/dashboard/biodata/new-application/medical_report',
    },
  ];

  const has_item_count = steps?.filter(
    (step) => step.isCompleted == true
  ).length;

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className='grid justify-center'>
          {steps?.length > 2 ? (
            <div className='mt-32 grid justify-center'>
              <section className='rounded-2xl border p-6'>
                <div className='flex justify-center'>
                  <Image
                    src='/images/Docreview.png'
                    alt='review'
                    width={400}
                    height={400}
                    className='object-cover'
                  />
                </div>
                <p className='mt-3 text-xl font-semibold'>Document Review</p>
                <p className='my-7 text-lg'>
                  Your documents will be reviewed and you should get a<br />{' '}
                  feedback within 48 hours.
                </p>

                <section className='mt-5 flex justify-between rounded-lg border p-5'>
                  <p>Tracking ID</p>
                  <CopyIcon textToCopy={tracking ?? ''} text={tracking ?? ''} />
                </section>
                {oneApplicant?.bio_query?.query_headers?.length > 0 ? (
                  <section className='mt-10 rounded-lg border border-[#FEE4E2] bg-[#FEF3F2] p-6'>
                    <p className='text-lg font-semibold'>ADMIN QUERY</p>
                    <p>
                      {oneApplicant?.bio_query?.comment + ' '}
                      {oneApplicant?.bio_query?.query_headers.join(', ')}
                    </p>
                  </section>
                ) : (
                  ''
                )}
                {oneApplicant?.status === 'approved' ? (
                  <section
                    className={`mt-14 rounded-lg border border-[##C1EBD2] bg-[#EBF9F0] p-6`}
                  >
                    <p className={`text-lg font-semibold`}>
                      APPLICATION APPROVED
                    </p>
                  </section>
                ) : (
                  ''
                )}
                {oneApplicant?.status === 'approved' ? (
                  ' '
                ) : (
                  <CustomButton
                    text='Track Application'
                    onClick={() => push('/schedule')}
                    color='text-white'
                    iconPosition='right'
                    icon={<BsArrowUpRight />}
                    className='mt-5 flex w-full justify-center py-3 text-center text-lg'
                  />
                )}
              </section>
            </div>
          ) : (
            // Normal display for non-pending statuses
            <section className='col-span-5 h-fit rounded-lg border p-10'>
              <p className='text-lg font-semibold'>
                Applicant Biodata ({has_item_count}/{steps?.length})
              </p>
              <p className='my-5'>
                You need to complete your application in order to request for
                your NATEP Certificate.
              </p>
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
          )}
          <section className='col-span-5 h-fit rounded-lg border p-10'>
            <p className='text-lg font-semibold'>
              Applicant Biodata ({has_item_count}/{steps?.length})
            </p>
            <p className='my-5'>
              You need to complete your application in order to request for your
              NATEP Certificate.
            </p>
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
      )}
    </>
  );
};

export default page;

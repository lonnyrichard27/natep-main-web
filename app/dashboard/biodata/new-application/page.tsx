'use client';

import FileUpload from '@/components/FileUpload';
import HeaderNav from '@/components/HeaderNav';
import { submitPassport } from '@/api/application';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { CustomButton } from '@/components/elements';
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
import CopyIcon from '@/components/CopyIcon';
import { getUserProfile } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import StepList from '@/components/StepList';
import { textReplacer } from '@/util/helpers';

const page = () => {
  const router = useRouter();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [base64File, setBase64File] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingExit, setLoadingExit] = useState<boolean>(false);
  const [tracking, setTracking] = useState<string>('');
  const [showDoc, setShowDoc] = useState('');
  const [stepText, setStepText] = useState('');

  const { data: applicant, isLoading: applicantLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile
  });

  console.log(applicant);

  const oneApplicant = useMemo(() => {
    return applicant;
  }, [applicant]);

  const steps = [
    {
      title: 'Verify NIN',
      subtitle: 'National Identification Number',
      icon: <IDCard />,
      isCompleted: true,
      name: 'verify_NIN',
    },
    {
      title: 'Biometrics',
      subtitle: 'Complete your biometrics',
      icon: <BiometricSvg />,
      isCompleted: true,
      name: 'biometrics',
    },
    {
      title: 'Passport',
      subtitle: 'Scan your passport',
      icon: <Passport />,
      isCompleted: oneApplicant?.has_scanned_passport === 1,
      name: 'passport',
    },
    {
      title: 'Photograph',
      subtitle: 'Upload recent photograph',
      icon: <Photograph />,
      isCompleted: oneApplicant?.has_photograph === 1,
      name: 'photograph',
    },
    {
      title: 'Address',
      subtitle: 'Input delivery address',
      icon: <LocationSvg />,
      isCompleted: oneApplicant?.has_address === 1,
      name: 'address',
    },
    {
      title: 'Education',
      subtitle: 'Scan your certifications',
      icon: <DocumentSvg />,
      isCompleted: oneApplicant?.has_education === 1,
      name: 'education',
    },
    {
      title: 'Employment',
      subtitle: 'Input Employer Details',
      icon: <EmploymentSvg />,
      isCompleted: oneApplicant?.has_employment === 1,
      name: 'employment',
    },
    {
      title: 'Police Report',
      subtitle: 'Request police report',
      icon: <ShieldSvg />,
      isCompleted: oneApplicant?.has_police_report === 1,
      name: 'police_Report',
    },
    {
      title: 'Medical Report',
      subtitle: 'Scan medical report',
      icon: <CrossSvg />,
      isCompleted: oneApplicant?.has_medicals === 1,
      name: 'medical_report',
    },
  ];

  const has_item_count = steps?.filter(
    (step) => step.isCompleted == true
  ).length;

  const checkEligibility = useMemo(() => {
    const data = {
      has_scanned_passport: oneApplicant?.has_scanned_passport,
      has_education: oneApplicant?.has_education,
      has_employment: oneApplicant?.has_employment,
      has_police_report: oneApplicant?.has_police_report,
      has_medicals: oneApplicant?.has_medicals,
      has_photograph: oneApplicant?.has_photograph,
      has_address: oneApplicant?.has_address,
      has_nin: oneApplicant?.has_nin,
      has_biometrics: oneApplicant?.has_biometrics,
    };

    // Check if any value in the object is 0
    const isDisabled = Object.values(data).some((value) => value === 0);

    return isDisabled;
  }, [oneApplicant]);

  useEffect(() => {
    const getTrackingId = () => {
      const trackingId = localStorage?.getItem('tracking_id') ?? '';
      setTracking(trackingId);
    };
    getTrackingId();
  }, []);
  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size / 1024);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64File(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRetake = () => {
    setFileName(null);
    setFileSize(null);
    setBase64File('');
  };

  const handleSubmitPassport = async () => {
    const base64Data = base64File.replace(
      /^data:(image\/png|image\/jpeg|application\/pdf);base64,/,
      ''
    );

    const data = { base_64: base64Data };
    const res = await submitPassport(data, setLoading);
    console.log(res, 'passport');
    if (res) router.push('/dashboard/biodata/new-application/photograph');
  };

  const handleSaveAndExit = async () => {
    const base64Data = base64File.replace(
      /^data:(image\/png|image\/jpeg|application\/pdf);base64,/,
      ''
    );

    const data = { base_64: base64Data };
    const res = await submitPassport(data, setLoadingExit);
    if (res) router.push('/dashboard');
  };

  return (
    // <>
    //   <div className='grid justify-center'>
    //     <section className='col-span-5 h-fit rounded-lg border p-10'>
    //       <p className='text-lg font-semibold'>
    //         Applicant Biodata ({has_item_count}/{steps?.length})
    //       </p>
    //       <p className='mb-5 mt-10'>
    //         You need to complete your biodata in order to request for your NATEP
    //         Certificate.
    //       </p>

    //       {steps.map((step, index) => (
    //         <StepList
    //           key={index}
    //           icon={step.icon}
    //           title={step.title}
    //           subtitle={step.subtitle}
    //           isCompleted={step.isCompleted}
    //         />
    //       ))}
    //     </section>
    //   </div>
    // </>
    <section className='mt-10 items-center justify-center md:grid'>
      <section className='rounded-lg border p-6'>
        <HeaderNav
          onClick={() => router.back()}
          title='International Passport'
        />
        <p className='my-5 mt-5 text-lg'>
          Upload the data page of your Passport document.
        </p>
        <FileUpload
          onFileUpload={handleFileUpload}
          onRetake={handleRetake}
          fileName={fileName}
          fileSize={fileSize}
          title='Upload Passport'
          label='Upload Pdf'
          pdf='PDF'
          accept='.pdf'
        />
        {base64File && (
          <div className='mt-4'>
            <p>Preview:</p>
            <iframe
              src={base64File}
              title='File Preview'
              className='h-[30rem] w-full rounded border'
            ></iframe>
          </div>
        )}
        <div className='gap-4 md:flex'>
          <CustomButton
            text='Save & Exit'
            color='text-black'
            className='mt-7 flex w-full justify-center py-3'
            onClick={handleSaveAndExit}
            bgColor='bg-[#F2F4F7]'
            loading={loadingExit}
          />

          <CustomButton
            text='Continue'
            color='text-white'
            className='mt-7 flex w-full justify-center py-3'
            onClick={handleSubmitPassport}
            loading={loading}
          />
        </div>
      </section>
      <section className='mt-5 flex justify-between rounded-lg border p-5'>
        <p>Tracking ID</p>
        <CopyIcon textToCopy={tracking ?? ''} text={tracking ?? ''} />
      </section>
    </section>
  );
};

export default page;

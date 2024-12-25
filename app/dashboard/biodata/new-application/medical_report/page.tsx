'use client';

import React, { useEffect, useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import FileUpload from '@/components/FileUpload';
import { useRouter } from 'next/navigation';
import { submitMedicalReport } from '@/api/application';
import CopyIcon from '@/components/CopyIcon';
import { CustomButton } from '@/components/elements';
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [base64File, setBase64File] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingExit, setLoadingExit] = useState<boolean>(false);
  const [tracking, setTracking] = useState<string>('');

  useEffect(() => {
    const getTrackingId = () => {
      const trackingId = localStorage?.getItem('tracking_id') ?? '';
      setTracking(trackingId);
    };
    getTrackingId();
  }, []);

  const handleFileUpload = (file: File) => {
    const fileSizeInKB = file.size / 1024; // Convert bytes to KB
    setFileName(file.name);
    setFileSize(fileSizeInKB);

    // Check if the file size is greater than or equals to 800KB
    if (fileSizeInKB >= 800) {
      toast.error('File too large, please try again');
      return;
    }

    // If file size is valid, proceed with base64 encoding
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

  const handleSubmitMedicalReport = async () => {
    // const base64Data = base64File.replace('data:image/png;base64,', '');
    const base64Data = base64File.replace(
      /^data:(image\/png|image\/jpeg|application\/pdf);base64,/,
      ''
    );

    const data = { base_64: base64Data };
    const res = await submitMedicalReport(data, setLoading);
    // if (res) router.push('/dashboard/biodata');
    if (res) router.push(`/dashboard/biodata/view-application`)
  };

  const handleSaveAndExit = async () => {
    const base64Data = base64File.replace(
      /^data:(image\/png|image\/jpeg|application\/pdf);base64,/,
      ''
    );

    const data = { base_64: base64Data };
    const res = await submitMedicalReport(data, setLoadingExit);
    if (res) router.push('/dashboard/biodata');
    // if (res) router.push(`/dashboard/biodata/view-application`)

  };

  return (
    <section className='mt-10 items-center justify-center md:grid'>
      <section className='rounded-lg border p-6'>
        <HeaderNav onClick={() => router.back()} title='Medical Report' />

        <p className='mt-2 text-lg font-light'>
          Kindly provide your medical report details here.
        </p>

        <FileUpload
          onFileUpload={handleFileUpload}
          onRetake={handleRetake}
          fileName={fileName}
          fileSize={fileSize}
          title='Upload Photograph'
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
            onClick={handleSubmitMedicalReport}
            loading={loading}
          />
        </div>
      </section>
      {!tracking && <section className="p-5 mt-5 border rounded-lg flex justify-between">
        <p>Tracking ID</p>
        {<CopyIcon textToCopy={tracking ?? ''} text={tracking ?? ''}/>}
      </section>}
    </section>
  );
};

export default page;

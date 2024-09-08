'use client';

import React, { useEffect, useState } from 'react';
// import CustomButton from '@/components/Custom/CustomButton';
import FileUpload from '@/components/FileUpload';
import HeaderNav from '@/components/HeaderNav';
import { useRouter } from 'next/navigation';
import { submitPhotograph } from '@/api/application';
import { CustomButton } from '@/components/elements';
import CopyIcon from '@/components/CopyIcon';
// import CopyIcon from '@/components/CopyIcon';

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
      const trackingId = localStorage?.getItem('trackingid') ?? '';
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

  const handleSubmitPhotograph = async () => {
    const base64Data = base64File.replace(
      /^data:(image\/png|image\/jpeg|application\/pdf);base64,/,
      ''
    );

    const data = { photograph: base64Data };
    const res = await submitPhotograph(data, setLoading);
    if (res) router.push('/dashboard/biodata/new-application/address');
  };

  const handleSaveAndExit = async () => {
    const base64Data = base64File.replace(
      /^data:(image\/png|image\/jpeg|application\/pdf);base64,/,
      ''
    );

    const data = { photograph: base64Data };
    const res = await submitPhotograph(data, setLoadingExit);
    if (res) router.push('/dashboard');
  };

  return (
    <section className='mt-10 grid items-center justify-center'>
      <section className='rounded-lg border p-6'>
        <HeaderNav onClick={() => router.back()} title='Photograph' />

        <p className='my-5 mt-3 text-lg'>
          Upload a clear photograph image that would be used in your
          <br />
          certificate.
        </p>

        <FileUpload
          onFileUpload={handleFileUpload}
          onRetake={handleRetake}
          fileName={fileName}
          fileSize={fileSize}
          title='Upload Photograph'
          pdf='jpeg/png'
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
            onClick={handleSubmitPhotograph}
            loading={loading}
          />
        </div>
      </section>
      {/* <section className='mt-5 flex justify-between rounded-lg border p-5'>
        <p>Tracking ID</p>
        <CopyIcon textToCopy={tracking ?? ''} text={tracking ?? ''} />
      </section> */}
    </section>
  );
};

export default page;

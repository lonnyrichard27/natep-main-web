'use client';

import React, { useEffect, useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import FileUpload from '@/components/FileUpload';
import { useRouter } from 'next/navigation';
import { submitPoliceReport } from '@/api/application';
import CopyIcon from '@/components/CopyIcon';
import { CustomButton, CustomInput } from '@/components/elements';

const page = () => {
  const router = useRouter();
  const [possap, setPossap] = useState<string>('');
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

  const handlePossapChange = (e: any) => {
    setPossap(e.target.value);
  };

  const handleSubmitPoliceReport = async () => {
    const base64Data = base64File.replace(
      /^data:(image\/png|image\/jpeg|application\/pdf);base64,/,
      ''
    );
    const data = { possap_number: possap, base_64: base64Data };
    const res = await submitPoliceReport(data, setLoading);
    if (res) router.push('/dashboard/biodata/new-application/medical_report');
  };

  const handleSaveAndExit = async () => {
    const base64Data = base64File.replace(
      /^data:(image\/png|image\/jpeg|application\/pdf);base64,/,
      ''
    );
    const data = { possap_number: possap, base_64: base64Data };
    const res = await submitPoliceReport(data, setLoadingExit);
    if (res) router.push('/dashboard/home');
  };

  return (
    <section className='mt-10 items-center justify-center md:grid'>
      <section className='rounded-lg border p-6'>
        <HeaderNav onClick={() => router.back()} title='Police Report' />
        <p className='mt-2 text-lg font-light'>
          Kindly provide your police report details here.
        </p>
        <CustomInput
          id='possap'
          label='POSSAP Number'
          placeholder='81200398'
          value={possap}
          onChange={handlePossapChange}
          className='my-3 mt-7'
        />

        <FileUpload
          onFileUpload={handleFileUpload}
          onRetake={handleRetake}
          fileName={fileName}
          fileSize={fileSize}
          accept='.pdf'
          title='Upload Police Report'
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
            disabled={!possap || !base64File}
          />

          <CustomButton
            text='Continue'
            color='text-white'
            className='mt-7 flex w-full justify-center py-3'
            onClick={handleSubmitPoliceReport}
            loading={loading}
            disabled={!possap || !base64File}
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
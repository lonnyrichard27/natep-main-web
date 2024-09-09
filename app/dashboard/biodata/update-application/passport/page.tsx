'use client';

import React, { useEffect, useState } from 'react';
import CopyIcon from '@/components/CopyIcon';
import FileUpload from '@/components/FileUpload';
import HeaderNav from '@/components/HeaderNav';
import { updatePassport } from '@/api/application';
import { useRouter } from 'next/navigation';
import { CustomButton } from '@/components/elements';
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
      const trackingId = localStorage?.getItem('tracking_id') ?? ''
      setTracking(trackingId)
    }
    getTrackingId();
    
  }, [])

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
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');

    const data = { base_64: base64Data, section: 'passport' };
    const res = await updatePassport(data, setLoading);
    if (res) router.back();
  };

  const handleSaveAndExit = async () => {
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');

    const data = { base_64: base64Data, section: 'passport' };
    const res = await updatePassport(data, setLoadingExit);
    const getId = localStorage.getItem('quickActionsId')
    if (res) router.push(`/dashboard/quick-action/${getId}`);
  };

  return (
    <section className="md:grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={() => router.back()} title="International Passport" />
        <p className="mt-5 text-lg my-5">
          Upload the data page of your Passport document.
        </p>
        <FileUpload
          onFileUpload={handleFileUpload}
          onRetake={handleRetake}
          fileName={fileName}
          fileSize={fileSize}
          title="Upload Passport"
          pdf=" PDF"
          accept=" .pdf"
        />
        {base64File && (
          <div className="mt-4">
            <p>Preview:</p>
            <iframe
              src={base64File}
              title="File Preview"
              className="w-full h-[30rem] border rounded"
            ></iframe>
          </div>
        )}
        <div className="md:flex gap-4">
          <CustomButton
            text="Save & Exit"
            color="text-black"
            className={`py-3 w-full flex mt-7 justify-center ${!base64File ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={handleSaveAndExit}
            bgColor="bg-[#F2F4F7]"
            loading={loadingExit}
            disabled={!base64File}
          />

          <CustomButton
            text="Continue"
            color="text-white"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={handleSubmitPassport}
            loading={loading}
            disabled={!base64File}
          />
        </div>
      </section>
      <section className="p-5 mt-5 border rounded-lg flex justify-between">
        <p>Tracking ID</p>
        <CopyIcon textToCopy={tracking ?? ''} text={tracking ?? ''}/>
      </section>
    </section>
  );
};

export default page;

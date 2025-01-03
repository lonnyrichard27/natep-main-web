'use client'

import React, { useEffect, useState } from 'react';
import FileUpload from '@/components/FileUpload';
import HeaderNav from '@/components/HeaderNav';
import { useRouter } from 'next/navigation';
import { updatePhotograph } from '@/api/application';
import CopyIcon from '@/components/CopyIcon';
import { CustomButton } from '@/components/elements';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const page = () => {
  const router = useRouter(); 
  const queryClient = useQueryClient();
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

  const handleSubmitPhotograph = async () => {
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');

    const data = { photograph: base64Data, section: 'photograph' };
    const res = await updatePhotograph(data, setLoading);
    if (res) {
      queryClient.invalidateQueries({ queryKey: ['user']})
      router.back()
    };
  };

  const handleSaveAndExit = async () => {
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');

    const data = { photograph: base64Data, section: 'photograph' };
    const res = await updatePhotograph(data, setLoadingExit);
    if (res) {
      queryClient.invalidateQueries({ queryKey: ['user']})
      router.back()
    };
  };

  return (
    <section className="grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={() => router.back()} title="Photograph" />

        <p className="mt-3 text-lg my-5">
          Upload a clear photograph image that would be used in your<br />
          certificate.
        </p>

        <FileUpload
          onFileUpload={handleFileUpload}
          onRetake={handleRetake}
          fileName={fileName}
          fileSize={fileSize}
          title="Upload Photograph"
          label="Upload image here"
          pdf="JPG, PNG"
          accept="image/jpeg, image/png"
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
            className="py-3 w-full flex mt-7 justify-center"
            onClick={handleSaveAndExit}
            bgColor="bg-[#F2F4F7]"
            loading={loadingExit}
          />

          <CustomButton
            text="Continue"
            color="text-white"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={handleSubmitPhotograph}
            loading={loading}
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

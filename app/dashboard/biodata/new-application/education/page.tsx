'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitEducation } from '@/api/application';
import HeaderNav from '@/components/HeaderNav';
import FileUpload from '@/components/FileUpload';
import { CustomButton, CustomInput, CustomSelect } from '@/components/elements';
import CopyIcon from '@/components/CopyIcon';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [base64File, setBase64File] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
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

  //Loading...
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

  const handleSubmitEducation = async () => {
    const base64Data = base64File.replace(
      /^data:(image\/png|image\/jpeg|application\/pdf);base64,/,
      ''
    );

    const data = {
      base_64: base64Data,
      education_level: selectedOption,
      institution_name: institution
    };
    const res = await submitEducation(data, setLoading);
    if (res) {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      router.push('/dashboard/biodata/new-application/employment')
    }
  };

  const handleSaveAndExit = async () => {
    const base64Data = base64File.replace(
      /^data:(image\/png|image\/jpeg|application\/pdf);base64,/,
      ''
    );

    const data = {
      base_64: base64Data,
      education_level: selectedOption,
      institution_name: institution
    };
    const res = await submitEducation(data, setLoadingExit);
    if (res) {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      router.push('/dashboard/biodata')
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    { value: 'PHD', label: 'Phd' },
    { value: 'MSC', label: 'MSc' },
    { value: 'BSC', label: 'BSc' },
    { value: 'OND', label: 'OND' },
    { value: 'HND', label: 'HND' }
  ];

  return (
    <section className='mt-10 items-center justify-center md:grid'>
      <section className='rounded-lg border p-6'>
        <HeaderNav onClick={() => router.back()} title='Education' />

        <p className='mt-2 text-lg font-light'>
          Kindly provide your educational documents here.
        </p>

        <CustomSelect
          label='Educational Level'
          name='education'
          id='education'
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className='mt-5'
        />

        <CustomInput
          id='institution'
          label='Name Of Institution'
          placeholder='Yale'
          value={institution}
          onChange={(e: any) => setInstitution(e.target.value)}
          className='my-3 mt-7'
        />

        <FileUpload
          onFileUpload={handleFileUpload}
          onRetake={handleRetake}
          fileName={fileName}
          fileSize={fileSize}
          title='Upload Certificate'
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
            disabled={!institution || !selectedOption || !base64File}
          />

          <CustomButton
            text='Continue'
            color='text-white'
            className='mt-7 flex w-full justify-center py-3'
            onClick={handleSubmitEducation}
            loading={loading}
            disabled={!institution || !selectedOption || !base64File}
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

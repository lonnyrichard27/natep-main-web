'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateEducation } from '@/api/application';
import HeaderNav from '@/components/HeaderNav';
import FileUpload from '@/components/FileUpload';
import CopyIcon from '@/components/CopyIcon';
import { CustomButton, CustomInput, CustomSelect } from '@/components/elements';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

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

  const handleSubmitEducation = async () => {
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');

    const data = {
      base_64: base64Data,
      education_level: selectedOption,
      institution_name: institution,
      section: 'education'
    };
    const res = await updateEducation(data, setLoading);
    if (res) {
      queryClient.invalidateQueries({ queryKey: ['user']})
      router.back()
    };
  };

  const handleSaveAndExit = async () => {
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');

    const data = {
      base_64: base64Data,
      education_level: selectedOption,
      institution_name: institution,
      section: 'education'
    };
    const res = await updateEducation(data, setLoadingExit);
    if (res) {
      queryClient.invalidateQueries({ queryKey: ['user']})
      router.back()
    };
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
    <section className="md:grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={() => router.back()} title="Education" />

        <p className="mt-2 text-lg font-light">Kindly provide your educational documents here.</p>

        <CustomSelect
          label="Educational Level"
          name="education"
          id="education"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className="mt-5"   
        />

        <CustomInput
          id="institution"
          label="Name Of Institution"
          placeholder="Yale"
          value={institution}
          onChange={(e:any) => setInstitution(e.target.value)}
          className="my-3 mt-7"
        />

        <FileUpload
          onFileUpload={handleFileUpload}
          onRetake={handleRetake}
          fileName={fileName}
          fileSize={fileSize}
          title="Upload Certificate"
          accept='.pdf'
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
            disabled={!institution || !selectedOption || !base64File}
          />

          <CustomButton
            text="Continue"
            color="text-white"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={handleSubmitEducation}
            loading={loading}
            disabled={!institution || !selectedOption || !base64File}
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

'use client';

import React, { useEffect, useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import CustomInput from '@/components/Custom/CustomInput';
import FileUpload from '@/components/FileUpload';
import CustomButton from '@/components/Custom/CustomButton';
import { useRouter } from 'next/navigation';
import { submitPoliceReport } from '@/services/applications';
import CopyIcon from '@/components/CopyIcon';

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
      const trackingId = localStorage?.getItem('trackingid') ?? ''
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

  const handlePossapChange = (e: any) => {
    setPossap(e.target.value);
  };

  const handleSubmitPoliceReport = async () => {
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');
    const data = { possap_number: possap, base_64: base64Data };
    const res = await submitPoliceReport(data, setLoading);
    if (res) router.push('/dashboard/new-application/medical_report');
  };

  const handleSaveAndExit = async () => {
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');
    const data = { possap_number: possap, base_64: base64Data };
    const res = await submitPoliceReport(data, setLoadingExit);
    if (res) router.push('/dashboard/home');
  };

  return (
    <section className="md:grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={() => router.back()} title="Police Report" />
        <p className="mt-2 text-lg font-light">Kindly provide your police report details here.</p>
        <CustomInput
          id="possap"
          label="POSSAP Number"
          placeholder="81200398"
          value={possap}
          onChange={handlePossapChange}
          className="my-3 mt-7"
        />

        <FileUpload
          onFileUpload={handleFileUpload}
          onRetake={handleRetake}
          fileName={fileName}
          fileSize={fileSize}
          title="Upload Police Report"
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
            disabled={!possap || !base64File}
          />

          <CustomButton
            text="Continue"
            color="text-white"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={handleSubmitPoliceReport}
            loading={loading}
            disabled={!possap || !base64File}
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
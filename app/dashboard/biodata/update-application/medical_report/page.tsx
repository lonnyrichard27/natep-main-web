'use client';

import React, { useEffect, useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import FileUpload from '@/components/FileUpload';
import { useRouter } from 'next/navigation';
import { updateMedicalReport } from '@/api/application';
import Modal from '@/components/Modal';
import CopyIcon from '@/components/CopyIcon';
import { CustomButton } from '@/components/elements';

const page = () => {
  const router = useRouter();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [base64File, setBase64File] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingExit, setLoadingExit] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tracking, setTracking] = useState<string>('');

  useEffect(() => {
    const getTrackingId = () => {
      const trackingId = localStorage?.getItem('trackingid') ?? ''
      setTracking(trackingId)
    }
    getTrackingId();
    
  }, [])

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const handleSubmitMedicalReport = async () => {
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');
    const data = { base64: base64Data, section: 'medical_report' };

    const res = await updateMedicalReport(data, setLoading);
    if (res) router.back()
  };

  const handleSaveAndExit = async () => {
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');

    const data = { base64: base64Data, section: 'medical_report' };
    const res = await updateMedicalReport(data, setLoadingExit);
    if (res) router.back();
  };

  return (
    <section className="md:grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={() => router.back()} title="Medical Report" />

        <p className="mt-2 text-lg font-light">
          Kindly provide your medical report details here.
        </p>

        <FileUpload
          onFileUpload={handleFileUpload}
          onRetake={handleRetake}
          fileName={fileName}
          fileSize={fileSize}
          title="Upload Medical Report"
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
          />

          <CustomButton
            text="Continue"
            color="text-white"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={handleSubmitMedicalReport}
            loading={loading}
          />
        </div>
        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Submission Successful"
          content={
            <div className='text-center flex flex-col items-center'>
              <p>Your application has been successfully uploaded</p>
              <CustomButton
                text="Go To Home Page"
                color="text-white"
                className="py-3 w-full flex mt-7 justify-center"
                bgColor="bg-primary"
                onClick={() => router.push('/dashboard')}
              />
            </div>
          }
        />
      </section>
      <section className="p-5 mt-5 border rounded-lg flex justify-between">
          <p>Tracking ID</p>
          <CopyIcon textToCopy={tracking ?? ''} text={tracking ?? ''}/>
        </section>
    </section>
  );
};

export default page;

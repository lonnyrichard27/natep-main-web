'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiAttachment2 } from 'react-icons/ri';
import { useQuery } from '@tanstack/react-query';
import HeaderNav from '@/components/HeaderNav';
import axiosInstance from '@/util/axios';
import Modal from '@/components/Modal';
import { CustomButton } from '@/components/elements';
import BasicDetailsCard from '@/components/elements/BasicDetailsCard';
import PageLoader from '@/components/PageLoader';
import { completeBiodata, previewBiodata } from '@/api/application';


const page = () => {
  const { back, push } = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [showDoc, setShowDoc] = useState('');
  const [stepText, setStepText] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const { data: oneApplicant, isLoading } = useQuery({
    queryKey: ['previewBiodata'],
    queryFn: previewBiodata
  });

  const closeModal = () => setModalOpen(false);

  const nameParts = oneApplicant?.name ? oneApplicant.name.split(' ') : [];
  // Get the surname (last element of the array), fallback to an empty string if nameParts is empty
  const surname = nameParts.length > 0 ? nameParts[nameParts.length - 1] : '';
  
  // Get the other names (all elements except the last one), fallback to an empty string if nameParts is empty
  const otherNames = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';

  const showit = async (text: string) => {
    const response = await axiosInstance.get(`/biodata/view-document/${oneApplicant?.id}?section=${text}`);
    setShowDoc(response?.data?.data.document);
    setModalOpen(true);
    setStepText(text);
  };

  let mimeType = '';

  if (showDoc.startsWith('/9j/')) {
    mimeType = 'image/jpeg';
  } else if (showDoc.startsWith('iVBORw0KGgo')) {
    mimeType = 'image/png';
  } else if (showDoc.startsWith('JVBER')) {
    mimeType = 'application/pdf';
  }

  const viewTheDoc = `data:${mimeType};base64,${showDoc}`;

  const documents = [
    { label: 'Passport', file: 'passport' },
    { label: 'Education Certificate', file: 'education' },
    { label: 'Employment Letter', file: 'employment' },
    { label: 'Police Report', file: 'police_report' },
    { label: 'Medical Report', file: 'medical_report' }
  ];

  const handleConfirm = async () => {
    await completeBiodata(setLoading);
    push('/dashboard/quick-action')
  };

  return (
    <div className="md:px-20 my-20 px-6">
      <div className="flex justify-between">
        <HeaderNav onClick={back} title="Biodata Preview" />
        <CustomButton text="Confirm Submission" loading={loading} disabled={!oneApplicant} onClick={handleConfirm} />
      </div>

      {!isLoading ? 
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-8 lg:gap-8">
        <div className="">
          <div className="rounded-2xl border p-10">
            <p className="my-4 text-[#98A2B3] text-lg">Basic Details</p>
            <BasicDetailsCard mainText="SURNAME/nom" subText={surname} />
            <BasicDetailsCard mainText="GIVEN NAMES/prénom" subText={otherNames} />
            <BasicDetailsCard mainText="ADDRESS" subText={oneApplicant?.address} />
            <BasicDetailsCard mainText="NIN" subText={oneApplicant?.nin} />

            <article className="my-5 flex gap-8">
              <BasicDetailsCard mainText="EMAIL ADDRESS" subText={oneApplicant?.email} />
              <BasicDetailsCard mainText="PHONE NUMBER" subText={oneApplicant?.phone} />
            </article>
          </div>
          <div className="rounded-2xl border p-10 mt-5">
            <p className="my-4 text-[#98A2B3] text-lg">Document Uploads</p>
            {documents?.map((doc, index) => (
              <button
                key={index}
                className="flex w-fit my-5 items-center gap-1 rounded-2xl bg-[#F2F4F7] px-2 py-1 text-sm font-medium text-black"
                onClick={() => showit(doc.file)}
              >
                <RiAttachment2 className="text-xl" />
                <span>{doc.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="">
          <div className="rounded-2xl border p-10">
            <p className="my-4 text-[#98A2B3] text-lg">Education Details</p>
            <BasicDetailsCard mainText="Highest Level" subText={oneApplicant?.bio_data?.education?.details?.education_level} />
            <BasicDetailsCard mainText="Institution" subText={oneApplicant?.bio_data?.education?.details?.institution_name} />
          </div>
          
          <div className="rounded-lg border p-10 mt-5">
            <p className="my-4 text-[#98A2B3] text-lg">Employment Details</p>
            <BasicDetailsCard mainText="Company Name" subText={oneApplicant?.bio_data?.employment?.details?.company_name} />
            <BasicDetailsCard mainText="ADDRESS" subText={oneApplicant?.bio_data?.employment?.details?.address} />
            <article className="my-5 flex gap-8">
              <BasicDetailsCard mainText="State" subText={oneApplicant?.bio_data?.employment?.details?.state}  />
              <BasicDetailsCard mainText="Country" subText={oneApplicant?.bio_data?.employment?.details?.country} />
            </article>
          </div>
          <div className="rounded-lg border p-10 mt-5">
            <p className="my-4 text-[#98A2B3] text-lg">Police Details</p>
            <BasicDetailsCard mainText="POSSAP Number" subText={oneApplicant?.bio_data?.police_report?.details?.possap_number} />
          </div>
        </div>
      </div> : <PageLoader />}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={stepText || ''}
        content={
          <>
            {showDoc.length > 0 ? (
              mimeType === 'application/pdf' 
                ? 
                  <iframe src={viewTheDoc} title="PDF Viewer" className='min-h-[600px] w-full' />
                : 
                  <img src={viewTheDoc} alt="Document Preview" style={{ maxWidth: '100%', minHeight: '600px' }} />
              ) : (
              <section className="flex justify-center items-center">
                <p>Applicant hasn't uploaded their {stepText}</p>
              </section>
            )}
          </>
        }
        />
    </div>
  );
};

export default page;

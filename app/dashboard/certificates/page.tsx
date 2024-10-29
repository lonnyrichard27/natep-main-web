'use client';

import React, { Suspense, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { CustomButton } from '@/components/elements';
import { useQuery } from '@tanstack/react-query';
import {
  CertificatesCard,
  CertificateSuccessModal,
  RRRModal,
} from '@/components/sections/certificates';
import { EmptyState, LoaderModal, PageLoader } from '@/components/Navigation';
import { getCertificates } from '@/services/certificate-services';
import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';
import { useSearchParams } from 'next/navigation';
import { validateTransaction } from '@/services/transaction-services';

const PageContent = () => {
  const [open, setOpen] = useState(false);
  const [txnDetails, setTxnDetails] = useState({ rrr: '', txref: '' });

  const handleRemitaModal = () => {
    setOpen(!open);
  };

  const searchParams = useSearchParams();

  // Retrieve the 'txref' and 'rrr' query parameters
  const txref = searchParams.get('txref');
  const rrr = searchParams.get('rrr');

  const { isLoading: isVerifying, isSuccess } = useQuery({
    queryKey: ['verify-transaction', txref, rrr],
    queryFn: () => validateTransaction({ rrr, txref }),
    enabled: !!txref && !!rrr,
  });

  const { data: allCertificates, isLoading: certificatesLoading } = useQuery({
    queryKey: ['certificates'],
    queryFn: () => getCertificates(),
  });

  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequest = async () => {
    setIsRequesting(true);
    try {
      const response = await axiosInstance.post(
        '/certificate/request-certificate'
      );
      if (response.status === 200 || response.status === 201) {
        const { rrr, txref } = response.data.data;
        setTxnDetails({ rrr, txref });
        setIsRequesting(false);
        handleRemitaModal();
      }
    } catch (error) {
      setIsRequesting(false);
      handleError(error);
    }
  };

  return (
    <div>
      <div className='mb-12 flex items-center justify-between gap-5'>
        <h1 className='text-lg font-semibold'>Certificate List</h1>

        <CustomButton
          text='Request Certificate'
          icon={<FiPlusCircle className='text-xl' />}
          onClick={handleRequest}
          color='text-white'
          disabledBgColor='opacity-45'
          className='!bg-primary py-3'
          disabled={isRequesting}
        />
      </div>

      <RRRModal
        open={open}
        setOpen={setOpen}
        closeClick={handleRemitaModal}
        txnDetails={txnDetails}
      />

      {certificatesLoading ? (
        <PageLoader />
      ) : allCertificates?.response && allCertificates?.response?.length > 0 ? (
        <div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-3'>
            {allCertificates?.response.map((cert: any, index: number) => (
              <CertificatesCard key={index} {...cert} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          title='No Certificate'
          desc='You have not requested for any certificate yet.'
        />
      )}

      {rrr && txref && (
        <>
          {isVerifying && <LoaderModal />}
          {isSuccess && <CertificateSuccessModal />}
        </>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <PageContent />
    </Suspense>
  );
};

export default Page;

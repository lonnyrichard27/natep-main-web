'use client';

import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { CustomButton } from '@/components/elements';
import { useQuery } from '@tanstack/react-query';
import { CertificatesCard } from '@/components/sections/certificates';
import { EmptyState, PageLoader } from '@/components/Navigation';
import { getCertificates } from '@/services/certificate-services';
import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { push } = useRouter();

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
        setIsRequesting(false);
        const paystack_url = response.data.data;
        push(paystack_url);
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

      {certificatesLoading ? (
        <PageLoader />
      ) : allCertificates?.response && allCertificates?.response?.length > 0 ? (
        <div>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6'>
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
    </div>
  );
};

export default Page;

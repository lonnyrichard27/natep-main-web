'use client';

import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { IoIosAlert } from 'react-icons/io';
import Image from 'next/image';
import { MapImg } from '@/public/assets/images';
import { CustomButton } from '@/components/elements';
import { getCertificates } from '@/services/certificate-services';
import { useQuery } from '@tanstack/react-query';
import { CertificatesCard } from '@/components/sections/certificates';

const Page = () => {
  const {
    data: allCertificates,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['certificates'],
    queryFn: () => getCertificates(),
  });

  console.log(allCertificates);

  return (
    <div>
      <div className='mb-12 flex items-center justify-between gap-5'>
        <h1 className='text-lg font-semibold'>Certificate List</h1>

        <CustomButton
          text='Request Certificate'
          icon={<FiPlusCircle className='text-xl' />}
          onClick={() => console.log('Button clicked')}
          color='text-white'
          className='py-3'
        />
      </div>

      {/* cards */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6'>
        <CertificatesCard />
        <CertificatesCard />
        <CertificatesCard />
      </div>
    </div>
  );
};

export default Page;

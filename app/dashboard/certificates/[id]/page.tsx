'use client';

import React, { useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import { useParams, useRouter } from 'next/navigation';
import { CertDetails, CertProfile } from '@/components/sections/certificates';
import { getSingleCertificate } from '@/services/certificate-services';
import { useQuery } from '@tanstack/react-query';

const page = () => {
  const { back } = useRouter();

  const params = useParams();
  const { id } = params;

  const [hide, setHide] = useState(true);

  const { data: singleCertificate, isLoading: certificateLoading } = useQuery({
    queryKey: ['single-certificate'],
    queryFn: () => getSingleCertificate({ id }),
    enabled: !!id,
  });

  console.log(singleCertificate);

  return (
    <div>
      <HeaderNav onClick={back} title='Digital Certificate' />

      {/* grids */}
      <div className='mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8'>
        <CertProfile hide={hide} setHide={setHide} />

        {!hide && <CertDetails />}
      </div>
    </div>
  );
};

export default page;

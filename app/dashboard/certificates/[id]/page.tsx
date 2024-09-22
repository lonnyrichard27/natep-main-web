'use client';

import React, { useMemo, useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import { useParams, useRouter } from 'next/navigation';
import { CertDetails, CertProfile } from '@/components/sections/certificates';
import { getSingleCertificate } from '@/services/certificate-services';
import { useQuery } from '@tanstack/react-query';
import { PageLoader } from '@/components/Navigation';

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

  const oneCertificate = useMemo(() => {
    return singleCertificate;
  }, [singleCertificate]);

  return (
    <div>
      <HeaderNav onClick={back} title='Digital Certificate' />

      {certificateLoading ? (
        <PageLoader />
      ) : (
        <div className='mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8'>
          <CertProfile
            certificate={oneCertificate}
            hide={hide}
            setHide={setHide}
          />

          {!hide && <CertDetails certificate={oneCertificate} />}
        </div>
      )}
    </div>
  );
};

export default page;

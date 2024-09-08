'use client';

import React, { useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import { useRouter } from 'next/navigation';
import { CertDetails, CertProfile } from '@/components/sections/certificates';

const page = () => {
  const { back } = useRouter();

  const [hide, setHide] = useState(true);

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

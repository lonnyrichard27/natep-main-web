import { textReplacer } from '@/util/helpers';
import React from 'react';

const CertDetails = () => {
  const cert_details: any = {
    surname: 'Abifoluwa',
    given_names: 'Aanuoluwakiishi, Tolu',
    address: '00000000000',
  };

  return (
    <div className='flex h-fit flex-col gap-4 rounded-lg border border-[#F2F4F7] p-10'>
      <h2 className='text-sm text-[#98A2B3]'>Certificate Details</h2>

      {Object.keys(cert_details).map((value, index) => (
        <article className='rounded bg-[#F9FAFB] p-4 font-medium'>
          <h3 className='mb-1 text-sm uppercase text-[#667085]'>
            <span>{textReplacer(value, '_')}</span>
          </h3>
          <p>{cert_details[value]}</p>
        </article>
      ))}

      <article className='grid grid-cols-2 gap-4'>
        <article className='rounded bg-[#F9FAFB] p-4 font-medium'>
          <h3 className='mb-1 text-sm text-[#667085]'>PASSPORT NUMBER</h3>
          <p>B123456789</p>
        </article>

        <article className='rounded bg-[#F9FAFB] p-4 font-medium'>
          <h3 className='mb-1 text-sm text-[#667085]'>CERTIFICATE ID</h3>
          <p>00000000000</p>
        </article>
      </article>
    </div>
  );
};

export default CertDetails;

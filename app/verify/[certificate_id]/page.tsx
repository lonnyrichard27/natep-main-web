'use client';

import { CustomButton } from '@/components/elements';
import { PageLoader } from '@/components/Navigation';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { getVerifiedCertificate } from '@/services/certificate-services';
import { getDate, textReplacer } from '@/util/helpers';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { MdCheck } from 'react-icons/md';

const VerifyCertificatePage = () => {
  const params = useParams();
  const { push } = useRouter();

  const { certificate_id } = params;

  const handleGoHome = () => {
    push(DashboardRoutes.HOME);
  };

  const { data: singleCertificate, isLoading: certificateLoading } = useQuery({
    queryKey: ['verify-certificate', certificate_id],
    queryFn: () => getVerifiedCertificate({ id: certificate_id }),
    enabled: !!certificate_id,
  });

  const cert_details: any =
    singleCertificate?.is_valid == 1
      ? {
          surname: singleCertificate?.name,
          issue_date:
            singleCertificate?.issue_date !== 'Invalid'
              ? getDate(singleCertificate?.issue_date)
              : 'N/A',
          status: singleCertificate?.status,
        }
      : { status: 'Invalid / Expired' };

  const is_valid = singleCertificate?.is_valid == 1;

  return (
    <section className='flex w-full flex-col gap-8 rounded-lg border bg-white px-6 py-10 md:w-[480px]'>
      {certificateLoading ? (
        <PageLoader />
      ) : (
        <>
          <div
            className={`${is_valid ? 'border-[#2B9957] bg-[#EBF9F0] text-[#2B9957]' : 'border-[#D92D20] bg-[#FEF3F2] text-[#D92D20]'} mx-auto flex w-fit items-center gap-2 rounded-full border px-4 py-1.5`}
          >
            {is_valid ? (
              <MdCheck className='text-xl' />
            ) : (
              <IoAlertCircleOutline className='text-xl' />
            )}

            <span className='text-sm font-medium'>
              {is_valid ? 'Valid Certificate' : 'Invalid Certificate'}
            </span>
          </div>

          <div className='text-center'>
            <h2 className='font-semibold'>
              Certificate of Talent Export Enrollment and Readiness
            </h2>
            <p className='mt-2 text-sm text-[#667085]'>{certificate_id}</p>
          </div>

          <div className='flex flex-col gap-2'>
            {Object.keys(cert_details).map((value, index) => (
              <div key={index} className='rounded bg-[#F9FAFB] p-4 font-medium'>
                <h3 className='mb-1.5 text-xs uppercase text-[#667085]'>
                  {textReplacer(value, '_')}
                </h3>
                <p className='text-sm capitalize text-black'>
                  {cert_details[value]}
                </p>
              </div>
            ))}
          </div>

          <CustomButton
            text='Go to Home'
            type='submit'
            className='w-full py-3'
            onClick={handleGoHome}
          />
        </>
      )}
    </section>
  );
};

export default VerifyCertificatePage;

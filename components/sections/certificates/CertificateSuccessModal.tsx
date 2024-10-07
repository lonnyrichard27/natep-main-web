import { Modal } from '@/components/elements';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { CertificateSuccess } from '@/public/assets/images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const CertificateSuccessModal = () => {
  const { push } = useRouter();

  return (
    <>
      <Modal
        open={true}
        size='sm'
        closeClick={() => push(DashboardRoutes.VIEW_CERTIFICATES)}
        closable
      >
        <div className='flex flex-col items-center justify-center gap-5 p-10 text-center'>
          <Image
            src={CertificateSuccess}
            width={400}
            height={300}
            alt='success certificate'
          />

          <h2 className='text-lg font-bold text-black md:text-2xl'>
            Your certificate is ready!
          </h2>

          <p className='text-sm md:text-base'>
            Well done! You can now view or download <br /> your digital
            certificate immediately.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CertificateSuccessModal;
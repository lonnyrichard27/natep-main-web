import { DashboardRoutes } from '@/components/Navigation/Routes';
import { LooperImg, MapImg } from '@/public/assets/images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const CertificatesCard = () => {
  const { push } = useRouter();

  const route = `${DashboardRoutes.VIEW_CERTIFICATES}/23`;

  return (
    <div className='relative rounded-lg bg-[#2B9957] p-6'>
      <button
        onClick={() => push(route)}
        className='relative z-10 flex flex-col gap-14 text-left'
        disabled
      >
        <div className='flex-1'>
          <h3 className='mb-1.5 font-semibold text-white'>
            Digital Certificate
          </h3>
          <p className='text-xs text-white/50'>
            did:ntep:c40f38a844efa54a4daa8d71cec5a548
          </p>
        </div>

        <div>
          <Image src={MapImg} width={64} height={64} alt='map image' />
        </div>
      </button>

      <span className='absolute right-6 top-6 text-white'>
        <FaCheckCircle />
      </span>

      <Image
        src={LooperImg}
        className='absolute right-0 top-0'
        alt='looper image'
      />
    </div>
  );
};

export default CertificatesCard;

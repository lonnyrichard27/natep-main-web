import { DashboardRoutes } from '@/components/Navigation/Routes';
import { LooperImg, MapImg } from '@/public/assets/images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const CertificatesCard = ({
  certificate_id,
  title,
  is_revoked,
  id,
}: {
  certificate_id: string;
  title: string;
  is_revoked: number;
  id: string;
}) => {
  const { push } = useRouter();

  const route = `${DashboardRoutes.VIEW_CERTIFICATES}/${id}`;

  return (
    <button
      className='relative rounded-lg bg-[#2B9957] disabled:bg-[#101828]'
      disabled={is_revoked === 1}
    >
      <button
        onClick={() => push(route)}
        className='relative z-30 flex flex-col gap-10 rounded-lg p-6 text-left'
        disabled={is_revoked === 1}
      >
        <div className='flex-1'>
          <h3 className='mb-1.5 font-semibold capitalize leading-5 text-white'>
            {title}
          </h3>
          <p className='text-xs text-white/50'>{certificate_id}</p>
        </div>

        <div>
          <Image src={MapImg} width={64} height={64} alt='map image' />
        </div>
      </button>

      <span className='absolute right-4 top-4 text-white'>
        <FaCheckCircle />
      </span>

      <Image
        src={LooperImg}
        className='absolute bottom-0 left-0 right-0 top-0 object-cover'
        alt='looper image'
      />
    </button>
  );
};

export default CertificatesCard;

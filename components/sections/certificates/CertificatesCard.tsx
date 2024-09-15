import { DashboardRoutes } from '@/components/Navigation/Routes';
import { LooperImg, MapImg } from '@/public/assets/images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdAlert } from 'react-icons/io';
import { TbAlertOctagonFilled } from 'react-icons/tb';

const CertificatesCard = ({
  is_revoked,
  validity,
  id,
}: {
  is_revoked: number;
  validity: number;
  id: string;
}) => {
  const { push } = useRouter();

  const route = `${DashboardRoutes.VIEW_CERTIFICATES}/${id}`;

  const cert_not_valid = is_revoked === 1 || validity === 0;

  return (
    <button
      className='relative rounded-lg bg-[#2B9957] disabled:bg-[#101828]'
      disabled={cert_not_valid}
    >
      <button
        onClick={() => push(route)}
        className='relative z-30 flex flex-col gap-10 rounded-lg p-6 text-left'
        disabled={cert_not_valid}
      >
        <div className='flex-1'>
          <h3 className='mb-1.5 font-semibold capitalize leading-5 text-white'>
            Digital Certificate
          </h3>
          <p className='text-xs text-white/50'>{id}</p>
        </div>

        <div>
          <Image src={MapImg} width={64} height={64} alt='map image' />
        </div>
      </button>

      <span className='absolute right-4 top-4 text-white'>
        {cert_not_valid ? <TbAlertOctagonFilled /> : <FaCheckCircle />}
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

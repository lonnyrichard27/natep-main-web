import { CustomButton } from '@/components/elements';
import { GuyImg } from '@/public/assets/images';
import {
  downloadCertificate,
  getDate,
  getDocument,
  textReplacer,
} from '@/util/helpers';
import Image from 'next/image';
import React from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { FaRegArrowAltCircleDown } from 'react-icons/fa';
import { LuMinusCircle } from 'react-icons/lu';
import ScheduleDelivery from './ScheduleDelivery';
import SelectPickupDate from './SelectPickupDate';
import { useParams } from 'next/navigation';
import { CertificateType } from '@/types/CertificateType';

const CertProfile = ({
  certificate,
  hide,
  setHide,
}: {
  hide: boolean;
  setHide: any;
  certificate: CertificateType | undefined;
}) => {
  const params = useParams();
  const { id: certificate_id } = params;

  const profile: any = {
    title: certificate?.title,
    issue_date: certificate?.issue_date
      ? getDate(certificate?.issue_date)
      : 'N/A',
    expiry_date: certificate?.expiry ? getDate(certificate?.expiry) : 'N/A',
  };

  const base64 = certificate?.photograph
    ? `data:image/png;base64,${certificate?.photograph}`
    : GuyImg;

  return (
    <div className='flex h-fit flex-col gap-9 rounded-lg border border-[#F2F4F7] p-10'>
      <Image src={base64} height={100} width={100} alt='applicant pic' />

      <div className='flex flex-col gap-4'>
        {Object.keys(profile).map((value, index) => (
          <article key={index}>
            <p className='text-sm font-light capitalize text-[#98A2B3]'>
              {textReplacer(value, '_')}
            </p>
            <p className='font-semibold capitalize'>{profile[value]}</p>
          </article>
        ))}
      </div>

      <section>
        {certificate?.has_delivery === 0 ? (
          <div className='grid grid-cols-2 gap-4'>
            <ScheduleDelivery certificate_id={certificate_id} />
            <SelectPickupDate certificate_id={certificate_id} />
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-4'>
            <CustomButton
              text='Download PDF'
              icon={<FaRegArrowAltCircleDown className='text-xl' />}
              onClick={() => downloadCertificate(getDocument(certificate?.id))}
              color='text-white'
              className='py-3'
            />
            <CustomButton
              text={hide ? 'Expand Details' : 'Hide Details'}
              icon={
                hide ? (
                  <BiPlusCircle className='text-xl text-black' />
                ) : (
                  <LuMinusCircle className='text-xl text-black' />
                )
              }
              onClick={() => setHide(!hide)}
              color='text-[#475467]'
              className='py-3'
              bgColor='bg-[#F2F4F7]'
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default CertProfile;

import { CustomButton } from '@/components/elements';
import { GuyImg } from '@/public/assets/images';
import { textReplacer } from '@/util/helpers';
import Image from 'next/image';
import React from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { FaRegArrowAltCircleDown } from 'react-icons/fa';
import { LuMinusCircle } from 'react-icons/lu';
import ScheduleDelivery from './ScheduleDelivery';
import SelectPickupDate from './SelectPickupDate';
import { useParams } from 'next/navigation';

const CertProfile = ({ hide, setHide }: { hide: boolean; setHide: any }) => {
  const params = useParams();
  const { id: certificate_id } = params;

  const profile: any = {
    title: 'Certificate for Talent Export Readiness',
    issue_date: '01 OCT 2008',
    expiry_date: '01 OCT 2008',
  };

  const value = true;

  return (
    <div className='flex h-fit flex-col gap-9 rounded-lg border border-[#F2F4F7] p-10'>
      <Image src={GuyImg} height={100} width={100} alt='applicant pic' />

      <div className='flex flex-col gap-4'>
        {Object.keys(profile).map((value, index) => (
          <article key={index}>
            <p className='text-sm font-light capitalize text-[#98A2B3]'>
              {textReplacer(value, '_')}
            </p>
            <p className='font-semibold'>{profile[value]}</p>
          </article>
        ))}
      </div>

      <section>
        {value ? (
          <div className='grid grid-cols-2 gap-4'>
            <ScheduleDelivery certificate_id={certificate_id} />
            <SelectPickupDate certificate_id={certificate_id} />
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-4'>
            <CustomButton
              text='Download PDF'
              icon={<FaRegArrowAltCircleDown className='text-xl' />}
              onClick={() => console.log('Button clicked')}
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

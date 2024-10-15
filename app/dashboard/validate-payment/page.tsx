'use client';

import { CustomButton, CustomInput, Modal } from '@/components/elements';
import { SupportedPayments } from '@/public/assets/images';
import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';
import { getDate, moneyFormat, textReplacer } from '@/util/helpers';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const DetailsItem = ({
  label,
  value,
}: {
  label: string;
  value: string | ReactNode;
}) => {
  return (
    <div className='flex items-center justify-between gap-5'>
      <div className='text-sm font-medium capitalize text-gray-700'>
        {textReplacer(label, '_')}
      </div>
      <div className='text-xs font-semibold uppercase text-[#2E353A] sm:text-sm'>
        {value || 'N/A'}
      </div>
    </div>
  );
};

const page = () => {
  const [open, setOpen] = useState(false);
  const [rrr, setRRR] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tnxData, setTnxData] = useState();

  const handleModal = () => {
    setOpen(!open);
  };

  const handleVerify = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.get(
        `/remita/remita-payment-verification?rrr=${rrr}`
      );
      if (response.status === 200 && 201) {
        const { data } = response.data;
        setTnxData(data);
        handleModal();
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      handleError(error);
    }
  };

  const payment_details: any = {
    Timestamp: getDate(new Date()),
    service: 'NTEP Certificate',
    amount: `NGN ${moneyFormat(50000)}`,
    transaction_ID: 123456789,
  };

  return (
    <div className='mx-auto flex flex-col items-center justify-center gap-8 md:w-[480px]'>
      <div className='flex w-full flex-col gap-8 rounded-lg border p-8'>
        <div className='flex flex-col gap-3'>
          <h2 className='font-semibold'>Validate Payment</h2>
          <p className='text-sm font-light text-gray-700'>
            Did you make any payment but haven&apos;t received value? Please
            fill in the required details below to validate your payment.
          </p>
        </div>

        <div className='flex flex-col gap-8'>
          <CustomInput
            id='transactionId'
            label='Remita Retrieval Reference (RRR)'
            placeholder='81200398'
            onChange={(e) => setRRR(e.target.value)}
          />

          <CustomButton
            text={isSubmitting ? 'Validating...' : 'Validate'}
            className='w-full py-3 text-base'
            onClick={handleVerify}
            disabled={rrr.length < 5 || isSubmitting}
          />
        </div>
      </div>

      <Image src={SupportedPayments} alt='supported payments' />

      <Modal
        open={open}
        size='xs'
        toggleOpen={(isOpen: boolean | ((prevState: boolean) => boolean)) =>
          setOpen(isOpen)
        }
        closeClick={handleModal}
        closable
      >
        <div className='flex w-full flex-col items-center justify-center gap-5 p-2 text-center'>
          <IoIosCheckmarkCircleOutline className='text-6xl text-green-600' />

          <h2 className='text-lg font-semibold text-green-600 md:text-xl'>
            Payment Successful!
          </h2>

          <div className='flex w-full flex-col gap-5 rounded-lg bg-gray-100 p-3'>
            {Object.keys(payment_details).map((value, index) => (
              <DetailsItem
                key={index}
                label={value}
                value={payment_details[value]}
              />
            ))}
          </div>

          <CustomButton
            text='Import Credential'
            className='w-full py-3 text-base'
          />
        </div>
      </Modal>
    </div>
  );
};

export default page;

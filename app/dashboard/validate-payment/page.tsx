'use client';

import { CustomButton, CustomInput, Modal } from '@/components/elements';
import {
  MasterCardLogo,
  RemitaLogo,
  ApplePayLogo,
  VerveLogo,
  VisaLogo,
} from '@/public/assets/images';
import axiosInstance from '@/util/axios';
import { handleError } from '@/util/errorHandler';
import { getDate, moneyFormat, textReplacer } from '@/util/helpers';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';

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
  const [rrr, setRRR] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tnxData, setTnxData] = useState({
    message: '',
    status: '',
    amount: 0,
    transactionDate: new Date(),
    orderId: '',
  });

  const success = '00';
  const pending = '021';
  const paid_message = 'Service has been render with this RRR';

  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };

  const [isPaid, setIsPaid] = useState(false);
  const handleServiceModal = () => {
    setIsPaid(!isPaid);
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
    } catch (error: any) {
      setIsSubmitting(false);
      if (error?.response?.data?.message == paid_message) {
        handleServiceModal();
      } else {
        handleError(error);
      }
    }
  };

  const payment_details: any = {
    Timestamp: getDate(tnxData?.transactionDate),
    service: 'NTEP Certificate',
    amount: `NGN ${moneyFormat(tnxData?.amount)}`,
    order_ID: tnxData?.orderId,
  };

  const supported_payments = [
    { src: VisaLogo, alt: 'visa logo' },
    { src: MasterCardLogo, alt: 'mastercard logo', width: 40, height: 30 },
    { src: VerveLogo, alt: 'verve logo' },
    { src: ApplePayLogo, alt: 'applepay logo', width: 50, height: 30 },
  ];

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

      <div className='relative flex w-full items-center justify-center gap-10 rounded-lg border px-8 py-6'>
        <div className='absolute -top-[22px] flex items-center bg-white p-2'>
          <span className='mr-1'>🔒</span>
          <span className='text-xs font-medium'>Secured by</span>
          <Image src={RemitaLogo} width={55} height={40} alt='remita logo' />
        </div>

        {supported_payments?.map((payment, index) => (
          <Image
            key={index}
            src={payment?.src}
            width={payment.width || 70}
            height={payment.height || 40}
            alt={payment.alt}
          />
        ))}
      </div>

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
          {tnxData?.status == success ? (
            <IoIosCheckmarkCircleOutline className='text-6xl text-green-600' />
          ) : (
            <IoWarningOutline className='text-6xl text-yellow-900' />
          )}

          <h2
            className={`text-lg font-semibold md:text-xl ${tnxData?.status == success ? 'text-green-600' : 'text-yellow-900'}`}
          >
            {tnxData?.message}!
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

          {tnxData.status == success && (
            <CustomButton
              text='Import Credential'
              className='w-full py-3 text-base'
            />
          )}
        </div>
      </Modal>

      <Modal
        open={isPaid}
        size='xs'
        toggleOpen={(isOpen: boolean | ((prevState: boolean) => boolean)) =>
          setIsPaid(isOpen)
        }
        closeClick={handleServiceModal}
        closable
      >
        <div className='flex w-full flex-col items-center justify-center gap-5 p-2 text-center'>
          <IoIosCheckmarkCircleOutline className='text-6xl text-green-600' />

          <h2 className={`text-lg font-semibold text-green-600 md:text-xl`}>
            Service Rendered!
          </h2>

          <p className='text-xs text-gray-600 sm:text-sm'>
            Service has already been rendered with this RRR!
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default page;

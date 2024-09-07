import {
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from '@/components/elements';
import { requestDeliverySchema } from '@/schema/certificateSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const RequestDeliveryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
  ];

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(requestDeliverySchema),
  });

  return (
    <div className='flex h-fit flex-col gap-6 rounded-lg border border-[#F2F4F7] p-10'>
      <div className='mb-6'>
        <h2 className='font-semibold'>Request Delivery</h2>
        <p className='mt-3 text-sm font-light text-[#344054]'>
          Kindly provide the required details below to fulfill your delivery
          request.
        </p>
      </div>

      <div>
        <CustomInput
          label='Relying Party Name'
          placeholder='name@email.com'
          onChange={(e) => console.log(e.target.value)}
        />
      </div>

      <CustomInput
        label='Contact Email'
        type='email'
        placeholder='docs@immigration.co.uk'
        onChange={(e) => console.log(e.target.value)}
      />

      <CustomInput
        label='Contact Phone'
        type='text'
        placeholder='080xxxxxx'
        onChange={(e) => console.log(e.target.value)}
      />

      <CustomSelect label='Country' name='color' options={options} />

      <CustomSelect label='State' name='color' options={options} />

      <CustomTextArea label='Address' />

      <CustomButton
        text='Continue'
        className='mt-2 w-full !bg-primary py-2.5'
        disabled={isSubmitting || !isValid}
        disabledBgColor='opacity-45'
      />
    </div>
  );
};

export default RequestDeliveryForm;

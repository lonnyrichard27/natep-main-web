import { CustomButton, CustomInput, CustomSelect } from '@/components/elements';
import React from 'react';

const RequestDeliveryForm = () => {
  const events = [
    {
      title: 'NATEP Headquarters',
      address: '1609 Admiralty Way, WUSE Zone 6',
      date: 'TUES, 06 DEC 2022',
    },
    {
      title: 'NATEP Headquarters',
      address: '1609 Admiralty Way, WUSE Zone 6',
      date: 'TUES, 06 DEC 2022',
    },
    {
      title: 'NATEP Headquarters',
      address: '1609 Admiralty Way, WUSE Zone 6',
      date: 'TUES, 06 DEC 2022',
    },

    // Add more events as needed
  ];

  const options = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
  ];

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
          id='partyName'
          label='Relying Party Name'
          placeholder=''
          onChange={(e) => console.log(e.target.value)}
        />
      </div>

      <CustomInput
        id='emailAddress'
        label='Contact Email'
        type='email'
        placeholder='ola@gmail.com'
        onChange={(e) => console.log(e.target.value)}
      />

      <CustomInput
        id='phone'
        label='Contact Phone'
        type='text'
        placeholder='080xxxxxx'
        onChange={(e) => console.log(e.target.value)}
      />

      <CustomSelect
        label='Country'
        name='color'
        id='color-select'
        options={options}
      />

      <CustomSelect
        label='State'
        name='color'
        id='color-select'
        options={options}
      />

      <div className='mt-5'>
        <label
          htmlFor='address'
          className='block text-[16px] font-medium text-gray-700'
        >
          Address
        </label>

        <textarea
          id='OrderNotes'
          className='mt-2 w-full rounded-lg border border-gray-200 p-4 align-top shadow-sm sm:text-sm'
          rows={4}
          placeholder='input address.'
        ></textarea>
      </div>

      <CustomButton text='Continue' className='mt-7 w-full py-4' />
    </div>
  );
};

export default RequestDeliveryForm;

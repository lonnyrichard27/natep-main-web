'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// @ts-ignore
import NaijaStates from 'naija-state-local-government';
import { submitAddress } from '@/api/application';
import { CustomButton, CustomSelect, CustomTextArea } from '@/components/elements';
import CopyIcon from '@/components/CopyIcon';
import HeaderNav from '@/components/HeaderNav';

interface Option {
  value: string;
  label: string;
}

const page = () => {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedLGA, setSelectedLGA] = useState<string>('');
  const [loadingExit, setLoadingExit] = useState<boolean>(false);
  const [tracking, setTracking] = useState<string>('');

  useEffect(() => {
    const getTrackingId = () => {
      const trackingId = localStorage?.getItem('trackingid') ?? '';
      setTracking(trackingId);
    };
    getTrackingId();
  }, []);

  const statesOptions: Option[] = NaijaStates.states().map((state: string) => ({
    value: state,
    label: state,
  }));

  const lgaOptions: Option[] = selectedState
    ? NaijaStates?.lgas(selectedState)?.lgas?.map((lga: string) => ({
        value: lga,
        label: lga,
      }))
    : [];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedLGA('');
  };

  const handleLGAChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLGA(e.target.value);
  };

  const handleSubmitAddress = async () => {
    const data = {
      lga: selectedLGA,
      state: selectedState,
      address: address
    };
    const res = await submitAddress(data, setLoading);
    if (res) router.push('/dashboard/biodata/new-application/education');
  };

  const handleSaveAndExit = async () => {
    const data = {
      lga: selectedLGA,
      state: selectedState,
      address: address
    };
    const res = await submitAddress(data, setLoadingExit);
    if (res) router.push('/dashboard/biodata');
  };

  return (
    <section className='mt-10 items-center justify-center md:grid'>
      <section className='rounded-lg border p-6'>
        <HeaderNav onClick={() => router.back()} title='Address' />

        <p className='mt-5 text-lg font-light'>
          Ensure this is your current address, your sealed certificate will
          <br /> be delivered to this address.
        </p>

        <CustomSelect
          label='Select State'
          name='state'
          id='state'
          options={statesOptions}
          value={selectedState}
          onChange={handleStateChange}
          className='my-4'
        />

        <CustomSelect
          label='Select LGA'
          name='lga'
          id='lga'
          options={lgaOptions}
          value={selectedLGA}
          onChange={handleLGAChange}
          className='mb-4'
        />

        <CustomTextArea
          label='Input Address'
          id='textarea-address'
          placeholder='Enter your address...'
          value={address}
          onChange={(e: any) => setAddress(e.target.value)}
        />
        <div className='gap-4 md:flex'>
          <CustomButton
            text='Save & Exit'
            color='text-black'
            className='mt-7 flex w-full justify-center py-3'
            onClick={handleSaveAndExit}
            loading={loadingExit}
            bgColor='bg-[#F2F4F7]'
            disabled={!selectedLGA || !selectedState || !address}
          />

          <CustomButton
            text='Continue'
            color='text-white'
            className='mt-7 flex w-full justify-center py-3'
            onClick={handleSubmitAddress}
            loading={loading}
            disabled={!selectedLGA || !selectedState || !address}
          />
        </div>
      </section>
      <section className='mt-5 flex justify-between rounded-lg border p-5'>
        <p>Tracking ID</p>
        <CopyIcon textToCopy={tracking ?? ''} text={tracking ?? ''} />
      </section>
    </section>
  );
};

export default page;

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderNav from '@/components/HeaderNav';
// @ts-ignore
import NaijaStates from 'naija-state-local-government';
import { updateAddress } from '@/api/application';
import CopyIcon from '@/components/CopyIcon';
import { CustomButton, CustomSelect, CustomTextArea } from '@/components/elements';

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
      const trackingId = localStorage?.getItem('tracking_id') ?? ''
      setTracking(trackingId)
    }
    getTrackingId();
    
  }, [])

  const statesOptions: Option[] = NaijaStates.states().map((state: string) => ({
    value: state,
    label: state
  }));

  const lgaOptions: Option[] = selectedState
    ? NaijaStates?.lgas(selectedState)?.lgas?.map((lga: string) => ({
        value: lga,
        label: lga
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
      address: address,
      section: 'address'
    };
    const res = await updateAddress(data, setLoading);
    if (res) router.back();
  };

  const handleSaveAndExit = async () => {
    const data = {
      lga: selectedLGA,
      state: selectedState,
      address: address,
      section: 'address'
    };
    const res = await updateAddress(data, setLoadingExit);
    if (res) router.back();
  };

  return (
    <section className="md:grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={() => router.back()} title="Address" />

        <p className="mt-5 text-lg font-light">
          Ensure this is your current address, your sealed certificate will
          <br /> be delivered to this address.
        </p>

        <CustomSelect
          label="Select State"
          name="state"
          id="state"
          options={statesOptions}
          value={selectedState}
          onChange={handleStateChange}
          className="my-4"
        />

        <CustomSelect
          label="Select LGA"
          name="lga"
          id="lga"
          options={lgaOptions}
          value={selectedLGA}
          onChange={handleLGAChange}
          className="mb-4"
        />

        <CustomTextArea
          label="Input Address"
          id="textarea-address"
          placeholder="Enter your address..."
          value={address}
          onChange={(e: any) => setAddress(e.target.value)}
        />
        <div className="md:flex gap-4">
          <CustomButton
            text="Save & Exit"
            color="text-black"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={handleSaveAndExit}
            loading={loadingExit}
            bgColor="bg-[#F2F4F7]"
            disabled={!selectedLGA || !selectedState || !address}
          />

          <CustomButton
            text="Continue"
            color="text-white"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={handleSubmitAddress}
            loading={loading}
            disabled={!selectedLGA || !selectedState || !address}
          />
        </div>
      </section>
      <section className="p-5 mt-5 border rounded-lg flex justify-between">
        <p>Tracking ID</p>
        <CopyIcon textToCopy={tracking ?? ''} text={tracking ?? ''}/>
      </section>
    </section>
  );
};

export default page;

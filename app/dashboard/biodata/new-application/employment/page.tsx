'use client';

import React, { useEffect, useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import CustomInput from '@/components/Custom/CustomInput';
import CustomButton from '@/components/Custom/CustomButton';
import FileUpload from '@/components/FileUpload';
import CustomTextArea from '@/components/Custom/CustomTextArea';
import { useRouter } from 'next/navigation';
import { getCountries, getState, submitEmployment } from '@/services/applications';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import CopyIcon from '@/components/CopyIcon';

const page = () => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState<string>('');
  const [officeAddress, setOfficeAddress] = useState<string>('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [base64File, setBase64File] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingExit, setLoadingExit] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [selectedCountryIso, setSelectedCountryIso] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [tracking, setTracking] = useState<string>('');

  useEffect(() => {
    const getTrackingId = () => {
      const trackingId = localStorage?.getItem('trackingid') ?? ''
      setTracking(trackingId)
    }
    getTrackingId();
    
  }, [])

  const [instanceIds, setInstanceIds] = useState<{ select1: string; select2: string }>({
    select1: '',
    select2: ''
  });

  useEffect(() => {
    setInstanceIds({
      select1: `select1-${Math.random().toString(36).substring(2, 15)}`,
      select2: `select2-${Math.random().toString(36).substring(2, 15)}`
    });
  }, []);

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size / 1024);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64File(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRetake = () => {
    setFileName(null);
    setFileSize(null);
    setBase64File('');
  };

  const { data: countries, isLoading: isLoadingCountries, error } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries
  });

  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: ['states', selectedCountryIso],
    queryFn: () => getState(selectedCountryIso)
  });

  const handleCountryChange = (selected: { value: string; label: string } | null) => {
    // @ts-ignore
    setSelectedCountry(selected);
    // @ts-ignore

    setCountry(selected.label);
    // @ts-ignore

    setSelectedCountryIso(selected.value);
  };

   const countryOptions = countries?.map((item: any) => ({
    // id: item.id,
    value: item.iso2,
    label: item.name
  }));

  const stateOptions = states?.map((item: any) => ({
    id: item.id,
    value: item.name,
    label: item.name
  }));

  const handleStateChange = (selected: { value: string; label: string } | null) => {
    // @ts-ignore
    setSelectedState(selected);
    // @ts-ignore
    setState(selected.label);
  };

  const handleSubmitEmployment = async () => {
    // const base64Data = base64File.replace('data:image/png;base64,', '');
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');

    const data = {
      offer_letter: base64Data,
      company_name: companyName,
      country: country,
      state: state,
      address: officeAddress
    };

    const res = await submitEmployment(data, setLoading);
    if (res) router.push('/dashboard/new-application/police-report');
  };

  const handleSaveAndExit = async () => {
    const base64Data = base64File.replace(/^data:(image\/png|image\/jpeg|application\/pdf);base64,/, '');
    const data = {
      offer_letter: base64Data,
      company_name: companyName,
      country: country,
      state: state,
      address: officeAddress
    };
    const res = await submitEmployment(data, setLoadingExit);
    if (res) router.push('/dashboard/home');
  };

  return (
    <section className="md:grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={() => router.back()} title="Employment" />

        <p className="mt-2 text-lg font-light">
          Kindly provide your employment details here.
        </p>
        <CustomInput
          id="company"
          label="Company Name"
          placeholder="e.g Google Inc"
          value={companyName}
          onChange={(e: any) => setCompanyName(e.target.value)}
          className="my-3 mt-7"
        />

        <label className="mt-5">Country</label>
        <Select
          options={countryOptions}
    // @ts-ignore

          onChange={handleCountryChange}
          value={selectedCountry}
          instanceId={instanceIds.select1} 
        />

        <p className="mt-5 mb-2">State</p>
        <Select
          options={stateOptions}
    // @ts-ignore

          onChange={handleStateChange}
          value={selectedState}
          instanceId={instanceIds.select2} 

        />

        <CustomTextArea
          label="Office Address"
          id="textarea-address"
          placeholder="Enter an address..."
          value={officeAddress}
          onChange={(e) => setOfficeAddress(e.target.value)}
        />

        <section className="mt-5">  
          <FileUpload
            onFileUpload={handleFileUpload}
            onRetake={handleRetake}
            fileName={fileName}
            fileSize={fileSize}
            title="Signed Offer Letter"
            accept='.pdf'
          />
          {base64File && (
            <div className="mt-4">
              <p>Preview:</p>
              <iframe
                src={base64File}
                title="File Preview"
                className="w-full h-[30rem] border rounded"
              ></iframe>
            </div>
          )}
        </section>
        <div className="md:flex gap-4">
          <CustomButton
            text="Save & Exit"
            color="text-black"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={handleSaveAndExit}
            bgColor="bg-[#F2F4F7]"
            loading={loadingExit}
            disabled={!companyName || !selectedCountry || !selectedState || !base64File || !officeAddress}
          />

          <CustomButton
            text="Continue"
            color="text-white"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={handleSubmitEmployment}
            loading={loading}
            disabled={!companyName || !selectedCountry || !selectedState || !base64File || !officeAddress}
          />
        </div>
      </section>
      <section className="p-5 mt-5 border rounded-lg flex justify-between">
        <p>Tracking ID</p>
        <CopyIcon textToCopy={tracking ?? ''} text={tracking ?? ''} />
      </section>
    </section>
  );
};

export default page;

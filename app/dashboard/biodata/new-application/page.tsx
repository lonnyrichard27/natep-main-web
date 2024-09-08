'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { submitNin } from '@/services/applications';
import { CustomButton, CustomInput } from '@/components/elements';
import { submitNin } from '@/api/application';

const page = () => {
  const router = useRouter()
  const [nin, setNin] = useState({
    nin: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNin({
      ...nin,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmitNin = async() => {
    const data = {
      nin: nin.nin,
      email: nin.email,
      phone: nin.phone
    }

    const res = await submitNin(data, setLoading)
    if (res) {
      localStorage.setItem('id', res.id)
      router.push('/dashboard/new-application/verify-biometrics')
    }
  }

  return (
    <section className="md:grid items-center justify-center">
      <section className="border md:max-w-7xl w-auto rounded-lg p-6 md:p-16">
        <p className="font-bold text-xl">Verify NIN</p>
        <p className="mt-2">Input the Applicant’s NIN and required details.</p>
        <CustomInput
          id="nin"
          label="NIN"
          placeholder="8120039890"
          value={nin.nin || ''}
          onChange={handleChange}
          className="my-3 mt-7"
        />
        <CustomInput
          id="email"
          label="Email Address"
          placeholder="johndoe@gmail.com"
          value={nin.email}
          onChange={handleChange}
          className="my-3 mt-7"
        />
        <CustomInput
          id="phone"
          label="Phone Number"
          value={nin.phone}
          onChange={handleChange}
          className="my-3 mt-7"
        />
        
        <CustomButton
          text="Continue"
          color="text-white"
          className="py-3 w-full flex mt-7 justify-center"
          onClick={handleSubmitNin}
          // loading={loading}
          disabled={!nin.email || !nin.phone || !nin.nin}
        />
      </section>
    </section>
  );
};

export default page;

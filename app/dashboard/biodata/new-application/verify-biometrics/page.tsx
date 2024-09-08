'use client';

import React, { useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import CameraCapture from '@/components/CameraCapture';
import { useRouter } from 'next/navigation';
import { submitBiometrics } from '@/services/applications';

// response object
// {
//   "match_data": {
//       "confidence": 0,
//       "percentage_match": 100
//   },
//   "tracking_id": "CCTBERHGB151AVG"
// }
const page = () => {
  const router = useRouter();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCapture = (imageDataUrl: string) => {
    setCapturedImage(imageDataUrl);
  };

  const handleSubmitImage = async() => {
    const data = { facebase64: capturedImage }
    const res = await submitBiometrics(data, setLoading)
    if (res) {
      const trackingId = res.tracking_id
      localStorage.setItem('trackingid', trackingId)
    }
    if (res) router.push('/dashboard/new-application/passport')
  };

  return (
    <section className="md:grid items-center justify-center md:mt-10">
      <section className=" border w-full rounded-lg p-6 md:p-10">
        <HeaderNav onClick={() => router.back()} title="Verify Biometrics" />

        <p className="mt-5 text-lg">Verify Applicant’s facial biometrics.</p>

        <section>
          <CameraCapture
            onCapture={handleCapture}
            buttonText="Take Picture"
            continueButton={handleSubmitImage}
            loading={loading}
          />
        </section>
      </section>
    </section>
  );
};

export default page;

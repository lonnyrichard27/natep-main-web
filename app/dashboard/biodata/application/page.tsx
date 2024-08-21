'use client';

import {
  Address,
  Education,
  Employment,
  MedicalReport,
  Passport,
  Photograph,
  PoliceReport,
  VerifyBiometrics,
  VerifyNIN
} from '@/components/Application_Process';
import ProgressBarUI from '@/components/ProgressBarUI';
import { useFormContext } from '@/context/ApplicationFormContext';

const page: React.FC = () => {
  const { step } = useFormContext();

  const stepsText = [
    'Verify NIN',
    'Biometrics',
    'Passport',
    'Photograph',
    'Address',
    'Education',
    'Employment',
    'Police Report',
    'Medical Report'
  ];

  const steps = [
    <VerifyNIN key="nin" />,
    <VerifyBiometrics key="biometrics" />,
    <Passport key="passport" />,
    <Photograph key="photograph" />,
    <Address key="address" />,
    <Education key="education" />,
    <Employment key="employment" />,
    <PoliceReport key="PoliceReport" />,
    <MedicalReport key="medicalReport" />,
  ];

  return (
    <>
      <section className="px-48 hidden md:block">
        <ProgressBarUI
          step={step}
          totalSteps={steps.length}
          labels={stepsText}
        />
      </section>
      <div className="md:p-20 p-6">
        <div className="md:grid md:justify-center">{steps[step]}</div>
      </div>
    </>
  );
};

export default page;

import React from 'react';

import { MdOutlineInfo } from 'react-icons/md';
import CustomButton from '../Custom/CustomButton';
import { useFormContext } from '@/context/ApplicationFormContext';
import HeaderNav from '../HeaderNav';
const VerifyBiometrics = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  return (
    <section className="md:grid items-center justify-center md:mt-10">
      <section className=" border w-full rounded-lg p-6 md:p-10">
        <HeaderNav onClick={prevStep} title="Verify Biometrics" />

        <p className="mt-5 text-lg">Verify Applicant’s facial biometrics.</p>

        <article className="rounded-lg items-center bg-[#D1FADF] mt-4 flex gap-4 p-4 w-full">
          <MdOutlineInfo className="text-xl text-[#248048]" />
          <p>Please turn your head to the left</p>
        </article>

        <div className="md:flex gap-4">
          <CustomButton
            text="Save & Exit"
            color="text-black"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={nextStep}
            bgColor='bg-[#F2F4F7]'
          />

          <CustomButton
            text="Continue"
            color="text-white"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={nextStep}
          />
        </div>
      </section>
    </section>
  );
};

export default VerifyBiometrics;

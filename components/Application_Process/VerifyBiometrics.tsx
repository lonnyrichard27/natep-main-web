import React from 'react';

import { MdOutlineInfo } from 'react-icons/md';
import { useFormContext } from '@/context/ApplicationFormContext';
import HeaderNav from '../HeaderNav';
import { CustomButton } from '../elements';
const VerifyBiometrics = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();

  return (
    <section className='items-center justify-center md:mt-10 md:grid'>
      <section className='w-full rounded-lg border p-6 md:p-10'>
        <HeaderNav onClick={prevStep} title='Verify Biometrics' />

        <p className='mt-5 text-lg'>Verify Applicant’s facial biometrics.</p>

        <article className='mt-4 flex w-full items-center gap-4 rounded-lg bg-[#D1FADF] p-4'>
          <MdOutlineInfo className='text-xl text-[#248048]' />
          <p>Please turn your head to the left</p>
        </article>

        <div className='gap-4 md:flex'>
          <CustomButton
            text='Save & Exit'
            color='text-black'
            className='mt-7 flex w-full justify-center py-3'
            onClick={nextStep}
            bgColor='bg-[#F2F4F7]'
          />

          <CustomButton
            text='Continue'
            color='text-white'
            className='mt-7 flex w-full justify-center py-3'
            onClick={nextStep}
          />
        </div>
      </section>
    </section>
  );
};

export default VerifyBiometrics;

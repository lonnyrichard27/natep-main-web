import React from 'react';
import FileUpload from '../FileUpload';
import { useFormContext } from '@/context/ApplicationFormContext';
import HeaderNav from '../HeaderNav';
import { CustomButton } from '../elements';
const Photograph = () => {
  const { formData, updateFormData, prevStep, nextStep } = useFormContext();

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
    // Handle the file upload logic here
  };
  return (
    <section className='mt-10 grid items-center justify-center'>
      <section className='rounded-lg border p-6'>
        <HeaderNav onClick={prevStep} title='Photograph' />

        <p className='my-5 mt-3 text-lg'>
          Upload a clear photograph image that would be used in your
          <br />
          certificate.
        </p>

        <FileUpload onFileUpload={handleFileUpload} title='Upload Passport' />
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

export default Photograph;

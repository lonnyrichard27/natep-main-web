import React from 'react';
import { MdOutlineInfo } from 'react-icons/md';
import FileUpload from '../FileUpload';
import CustomButton from '../Custom/CustomButton';
import { useFormContext } from '@/context/ApplicationFormContext';
import HeaderNav from '../HeaderNav';
const Photograph = () => {
  const { formData, updateFormData, prevStep, nextStep } = useFormContext();

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
    // Handle the file upload logic here
  };
  return (
    <section className="grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={prevStep} title="Photograph" />

        <p className="mt-3 text-lg my-5">
          Upload a clear photograph image that would be used in your<br />
          certificate.
        </p>

        <FileUpload onFileUpload={handleFileUpload} title="Upload Passport" />
        <div className="md:flex gap-4">
          <CustomButton
            text="Save & Exit"
            color="text-black"
            className="py-3 w-full flex mt-7 justify-center"
            onClick={nextStep}
            bgColor="bg-[#F2F4F7]"
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

export default Photograph;

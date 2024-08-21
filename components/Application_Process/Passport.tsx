import React from 'react';
import { MdOutlineInfo } from 'react-icons/md';
import FileUpload from '../FileUpload';
import { useFormContext } from '@/context/ApplicationFormContext';
import CustomButton from '../Custom/CustomButton';
import HeaderNav from '../HeaderNav';
const Passport = () => {
  const { formData, updateFormData, prevStep, nextStep } = useFormContext();

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
    // Handle the file upload logic here
  };
  return (
    <section className="md:grid items-center justify-center mt-10">
      <section className="border rounded-lg p-6">
        <HeaderNav onClick={prevStep} title="Passport" />
        <p className="mt-5 text-lg my-5">
          Upload the data page of your Passport document.
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

export default Passport;

'use client';

import CustomButton from '@/components/Custom/CustomButton';
import CustomInput from '@/components/Custom/CustomInput';
import React from 'react';

const page = () => {
  return (
    <div className="grid items-center justify-center">
      <div className="border rounded-lg p-20">
        <p className="font-bold mb-10">Validate Payment</p>
        <p>
          Did you make any payment but haven’t received value? Please
          <br /> fill in the required details below to validate your payment.
        </p>
        <CustomInput
          id="transactionId"
          label="Transaction ID/ Email"
          placeholder="81200398"
          onChange={(e) => console.log(e.target.value)}
          className="my-3 mt-5"
        />

        <CustomButton text="Validate" className="w-full mt-7 py-4" />
      </div>

      <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">Secured by Paystack</div>
      <div className="border border-t-0 -mt-5 p-10">

      </div>
    </div>
  );
};

export default page;

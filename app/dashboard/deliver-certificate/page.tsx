'use client';

import React from 'react';
import {
  OngoingDeliveries,
  RequestDeliveryForm,
} from '@/components/sections/certificates';

const page = () => {
  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
      <RequestDeliveryForm />
      <OngoingDeliveries />
    </div>
  );
};

export default page;

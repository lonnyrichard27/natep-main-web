'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { deleteCookie } from 'cookies-next';
import { DashboardRoutes } from '@/components/Navigation/Routes';

const Page = () => {
  const { push } = useRouter();

  useEffect(() => {
    const logOut = () => {
      deleteCookie('natep_user', { path: '/' });
      push(DashboardRoutes.LOGIN);
    };

    logOut();
  }, [push]);

  return <div className='flex items-center justify-center'></div>;
};

export default Page;

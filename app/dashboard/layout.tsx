'use client';

import { DashboardNav, Navbar } from '@/components/Navigation';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { FormProvider } from '@/context/ApplicationFormContext';
import { getAuthCookies } from '@/util/helpers';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const { isAuthenticated } = getAuthCookies();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You are not authorized!');
      push(DashboardRoutes.LOGIN);
    }
  }, [isAuthenticated, push]);

  return (
    <div className='h-screen'>
      <Navbar />

      <div className='relative mb-12 flex h-layout lg:mb-0'>
        <div className='relative hidden lg:block'>
          <DashboardNav />
        </div>

        <div className='flex-1 overflow-x-hidden px-6 py-10 md:px-12'>
          <FormProvider>{children}</FormProvider>
        </div>
      </div>
    </div>
  );
}

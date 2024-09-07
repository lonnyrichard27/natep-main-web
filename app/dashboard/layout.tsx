'use client';

import { DashboardNav, Navbar } from '@/components/Navigation';
import { FormProvider } from '@/context/ApplicationFormContext';

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-screen'>
      <Navbar />

      <div className='h-layout relative mb-12 flex lg:mb-0'>
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

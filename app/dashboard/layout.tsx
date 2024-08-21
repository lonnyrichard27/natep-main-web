'use client'

import { DashboardNav } from '@/components/Navigation/DashboardNav';
import Navbar from '@/components/Navigation/Navbar';
import { FormProvider } from '@/context/ApplicationFormContext';

export default function ScheduleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <DashboardNav>
    <FormProvider>
        
        {children}
        </FormProvider>
      </DashboardNav>
    </>
  );
}

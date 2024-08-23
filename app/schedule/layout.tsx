'use client'

import Footer from '@/components/Navigation/Footer';
import Navbar from '@/components/Navigation/Navbar';
import { Suspense } from 'react';

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>

      <Navbar />
      {children}
      <Footer />
    </Suspense>
  );
}

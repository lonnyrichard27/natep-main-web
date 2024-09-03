'use client';

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
      <div className="h-screen flex flex-col">
        <Navbar />

        <main className="bg-[#F2F4F7] h-full flex items-center justify-center py-10">
          {children}
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}

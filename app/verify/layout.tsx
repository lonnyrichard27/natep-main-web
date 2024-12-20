'use client';

import Footer from '@/components/Navigation/Footer';
import Navbar from '@/components/Navigation/Navbar';

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen flex-col'>
      <Navbar />

      <main className='flex h-full items-center justify-center bg-[#F2F4F7] py-10'>
        {children}
      </main>
      <Footer />
    </div>
  );
}

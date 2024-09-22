'use client';

import Footer from '@/components/Navigation/Footer';
import Navbar from '@/components/Navigation/Navbar';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { getAuthCookies } from '@/util/helpers';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function VerifyLayout({
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
    <div className='flex h-screen flex-col'>
      <Navbar />

      <main className='flex h-full items-center justify-center bg-[#F2F4F7] py-10'>
        {children}
      </main>
      <Footer />
    </div>
  );
}

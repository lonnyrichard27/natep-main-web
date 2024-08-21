'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { LineChart, Menu, Package, ShoppingCart, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { BiPolygon } from 'react-icons/bi';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FiCreditCard, FiSearch } from 'react-icons/fi';
import { useRouter, usePathname } from 'next/navigation';

interface CustomProps {
  children: ReactNode;
}

export function DashboardNav({ children }: CustomProps) {
  const pathname = usePathname();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard/biodata"
                className={`flex items-center gap-3 my-10 rounded-lg text-[16px] px-3 py-2 transition-all ${
                  pathname === '/dashboard/biodata'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <IoMdCheckmarkCircleOutline className="text-[26px]" />
                Update Biodata
              </Link>

              <Link
                href="/dashboard/certificates"
                className={`flex items-center gap-3 my-10 rounded-lg text-[16px] px-3 py-2 transition-all ${
                  pathname === '/dashboard/certificates'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <BiPolygon className="text-[26px]" />
                View Certificates
              </Link>

              <Link
                href="/dashboard/certificates/deliver-certificate"
                className={`flex items-center gap-3 my-10 rounded-lg text-[16px] px-3 py-2 transition-all ${
                  pathname === '/dashboard/certificates/deliver-certificate'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <MdOutlineMailOutline className="text-[26px]" />
                Deliver Certificate
              </Link>

              <Link
                href="/dashboard/payment"
                className={`flex items-center gap-3 my-10 rounded-lg text-[16px] px-3 py-2 transition-all ${
                  pathname === '/dashboard/payment'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <FiCreditCard className="text-[26px]" />
                Validate Payment
              </Link>

              <Link
                href="/dashboard/activities"
                className={`flex items-center gap-3 my-10 rounded-lg text-[16px] px-3 py-2 transition-all ${
                  pathname === '/dashboard/activities'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <FiSearch className="text-[26px]" />
                View Activities
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <p>logout</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center border-t gap-4 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/dashboard/biodata"
                className={`flex items-center gap-3 md:my-10 my-2 rounded-lg text-[16px] px-3 py-2 transition-all ${
                  pathname === '/dashboard/biodata'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <IoMdCheckmarkCircleOutline className="text-[26px]" />
                Update Biodata
              </Link>

              <Link
                href="/dashboard/certificates"
                className={`flex items-center gap-3 md:my-10 my-2 rounded-lg text-[16px] px-3 py-2 transition-all ${
                  pathname === '/dashboard/certificates'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <BiPolygon className="text-[26px]" />
                View Certificates
              </Link>

              <Link
                href="/dashboard/certificates/deliver-certificate"
                className={`flex items-center gap-3 md:my-10 my-2 rounded-lg text-[16px] px-3 py-2 transition-all ${
                  pathname === '/dashboard/certificates/deliver-certificate'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <MdOutlineMailOutline className="text-[26px]" />
                Deliver Certificate
              </Link>

              <Link
                href="/dashboard/payment"
                className={`flex items-center gap-3 md:my-10 my-2 rounded-lg text-[16px] px-3 py-2 transition-all ${
                  pathname === '/dashboard/payment'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <FiCreditCard className="text-[26px]" />
                Validate Payment
              </Link>

              <Link
                href="/dashboard/activities"
                className={`flex items-center gap-3 md:my-10 my-2 rounded-lg text-[16px] px-3 py-2 transition-all ${
                  pathname === '/dashboard/activities'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <FiSearch className="text-[26px]" />
                View Activities
              </Link>
              </nav>
              <div className="mt-auto">
                <p>logout</p>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

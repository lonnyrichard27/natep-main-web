import React, { useState } from 'react';
import Link from 'next/link';
import { BiLogOutCircle, BiPolygon } from 'react-icons/bi';
import { MdCreditCard, MdOutlineMail } from 'react-icons/md';
import { DashboardRoutes } from './Routes';
import { usePathname } from 'next/navigation';
import { FiCheckCircle, FiSearch } from 'react-icons/fi';
import { logoutUser } from '@/util/helpers';

interface navItemProps {
  item: {
    href: string | any;
    title: string;
    icon: string;
    base?: string;
  };
  open: boolean;
}

const NavItem = ({ open, item }: navItemProps) => {
  const pathname = usePathname();

  return (
    <Link href={item?.href}>
      <li
        className={`all__trans relative z-50 list-none rounded py-1 font-medium ${
          pathname.includes(item?.base || item?.href)
            ? `text-[#2B9957]`
            : `text-[#344054]`
        }`}
      >
        <span
          className={`absolute bottom-0 left-0 right-0 top-0 z-20 block rounded-md ${pathname.includes(item?.base || item?.href) ? '' : ''}`}
        />
        {open ? (
          <div className={`flex items-center gap-3 px-1`}>
            <span className='text-xl'>{item?.icon}</span>
            <span className={`text-sm capitalize`}>{item?.title}</span>
          </div>
        ) : (
          <span
            className={`flex items-center justify-center ${pathname.includes(item?.href)}`}
          >
            <span className='text-xl'>{item?.icon}</span>
          </span>
        )}
      </li>
    </Link>
  );
};

const DashboardNav = () => {
  const [open, setOpen] = useState(true);

  const handleOpenNav = () => {
    setOpen(true);
  };

  const handleCloseNave = () => {
    setOpen(false);
  };

  const nav_items = [
    {
      href: DashboardRoutes.BIODATA,
      icon: <FiCheckCircle />,
      title: 'Update Biodata',
    },
    {
      href: DashboardRoutes.VIEW_CERTIFICATES,
      icon: <BiPolygon />,
      title: 'View Certificates',
    },
    {
      href: DashboardRoutes.DELIVER_CERTIFICATES,
      icon: <MdOutlineMail />,
      title: 'Deliver Certificate',
    },
    {
      href: DashboardRoutes.PAYMENT,
      icon: <MdCreditCard />,
      title: 'Validate Payment',
    },
    {
      href: DashboardRoutes.VIEW_ACTIVITIES,
      icon: <FiSearch />,
      title: 'View Activities',
    },
  ];

  return (
    <div
      className={`scrollbar-hide relative z-50 flex h-full flex-col gap-10 overflow-y-scroll border border-[#F2F4F7] bg-[#F7F9FC] px-8 py-12 text-white duration-300 ${
        open ? 'w-[312px]' : 'w-20'
      }`}
    >
      <div className='text-sm font-medium text-[#98A2B3]'>QUICK ACTIONS</div>

      <div className={`${open ? 'px-0' : 'px-3'} flex flex-col gap-8`}>
        {nav_items?.map((item: any, index: any) => (
          <NavItem key={index} item={item} open={open} />
        ))}
      </div>

      <button
        onClick={logoutUser}
        className='mt-auto flex items-center gap-3 px-1 text-[#B42318]'
      >
        <span className='text-2xl'>
          <BiLogOutCircle />
        </span>
        <span className='capitalize'>Logout</span>
      </button>
    </div>
  );
};

export default DashboardNav;

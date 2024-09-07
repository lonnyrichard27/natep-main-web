'use client';

import React, { useState } from 'react';
import Badge from '../Badge';
// import SideDrawer from '@/components/SideDrawer';
// import { HistoryTypes } from './HistoryTable';
import { formatDateAndTime, moneyFormat } from '@/util/helpers';
import { LiaExternalLinkAltSolid } from 'react-icons/lia';
import Link from 'next/link';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { SideDrawer } from '../elements';

// const ViewTransaction = ({ trnx }: { trnx: HistoryTypes }) => {
const ViewTransaction = () => {
  const [isOpen, setisOpen] = useState(false);

  const handleOpen = () => {
    setisOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleOpen}>
        <Badge title='Details' />
      </button>

      <SideDrawer isOpen={isOpen} toggleDrawer={handleOpen}>
        <div>
          <h2 className='mb-8 text-lg font-semibold'>Transaction Details</h2>

          <div className='flex flex-col divide-y divide-gray-100 text-sm'>
            <div className='flex justify-between gap-1 py-5'>
              <div className='font-light text-[#475467]'>Timestamp</div>
              {/* <div className='flex gap-2 font-semibold'>
                <span>{formatDateAndTime(trnx.created_at).Date}</span>
                <span>{formatDateAndTime(trnx.created_at).Time}</span>
              </div> */}
            </div>

            <div className='flex justify-between gap-1 py-5'>
              <div className='font-light text-[#475467]'>Reference</div>
              {/* <div className='flex gap-2 font-semibold'>{trnx.reference}</div> */}
            </div>

            <div className='flex justify-between gap-1 py-5'>
              <div className='font-light text-[#475467]'>Transaction Type</div>
              <div className='flex gap-2 font-semibold'>
                Request Certificate
              </div>
            </div>

            <div className='flex justify-between gap-1 py-5'>
              <div className='font-light text-[#475467]'>Cost</div>
              <div className='flex gap-2 font-semibold'>
                {/* {moneyFormat(trnx.cost)} */}
              </div>
            </div>

            <div className='flex justify-between gap-1 py-5'>
              <div className='font-light text-[#475467]'>Payment Method</div>
              <div className='flex gap-2 font-semibold'>Debit Card</div>
            </div>

            <div className='flex justify-between gap-1 py-5'>
              <div className='font-light text-[#475467]'>Status</div>
              <div className='flex gap-2 font-semibold text-[#36BF6D]'>
                Success
              </div>
            </div>

            <div className='flex justify-between gap-1 py-5'>
              <div className='font-light text-[#475467]'>Applicant</div>
              {/* <Link
                href={`${DashboardRoutes.APPLICANTS}/${trnx.user}`}
                className='flex items-center gap-2 font-semibold'
              >
                <span className='text-[#36BF6D]'>View Profile</span>
                <LiaExternalLinkAltSolid className='text-lg' />
              </Link> */}
            </div>
          </div>
        </div>
      </SideDrawer>
    </div>
  );
};

export default ViewTransaction;

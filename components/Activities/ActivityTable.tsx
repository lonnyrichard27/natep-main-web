'use client';

import { FaSort } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { IoFilterOutline } from 'react-icons/io5';

// import { getHistory } from '@/services/admin';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { formatDateAndTime, moneyFormat } from '@/util/helpers';
// import ViewTransaction from './ViewTransaction';
import { SearchInput } from '@/components/elements';
import Pagination from '../Pagination';
import { fetchActivities } from '@/api/user';

export interface HistoryTypes {
  id: string;
  reference: string;
  cost: number;
  section: string;
  name: string;
  ipaddr: string;
  user: string;
  created_at: string;
  updated_at: string;
}

const ActivityTable = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset currentPage to 1 when searchQuery changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // const {
  //   data: allHistory,
  //   isLoading: historyLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ['history', currentPage, searchQuery],
  //   queryFn: () => getHistory({ page_num: currentPage, search: searchQuery }),
  // });

  const {
    data: allHistory,
    isLoading: historyLoading,
    error,
  } = useQuery({
    queryKey: ['activities', currentPage, searchQuery],
    queryFn: fetchActivities,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const history = allHistory?.response || null;

  if (error) return <p>Could not load the table</p>;

  return (
    <div className='overflow-x-auto'>
      <div className='mb-8 flex justify-between'>
        <section className='flex items-center'>
          <div className='flex items-center justify-center p-2'>
            <IoFilterOutline />
            <span className='ml-3 text-sm'>Filter</span>
          </div>

          <SearchInput
            value={searchQuery}
            onChange={(e: { target: { value: string } }) =>
              setSearchQuery(e.target.value)
            }
          />
        </section>

        <section>
          <button className='rounded-full bg-[#EBF9F0] px-4 py-2 text-sm font-medium text-[#2B9957]'>
            Export
          </button>
        </section>
      </div>

      {historyLoading ? (
        <div className='flex items-center justify-center text-center'>
          <p className='text-xl'>Loading transaction history table...</p>
        </div>
      ) : (
        <>
          <table className='w-full overflow-x-auto text-left text-sm'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th
                  scope='col'
                  className='whitespace-nowrap px-6 py-4 text-[14px] font-light text-gray-900'
                >
                  <span className='flex font-medium'>
                    DATE
                    <FaSort className='text-[#D0D5DD]' />
                  </span>
                </th>
                <th
                  scope='col'
                  className='whitespace-nowrap px-6 py-4 text-[14px] font-light text-gray-900'
                >
                  <span className='flex font-medium'>
                    REFERENCE
                    <FaSort className='text-[#D0D5DD]' />
                  </span>
                </th>
                <th
                  scope='col'
                  className='whitespace-nowrap px-6 py-4 text-[14px] font-light text-gray-900'
                >
                  <span className='flex font-medium'>COST (NGN)</span>
                </th>
                <th
                  scope='col'
                  className='whitespace-nowrap px-6 py-4 text-[14px] font-light text-gray-900'
                >
                  <span className='flex font-medium'>APPLICANT NAME</span>
                </th>
                <th
                  scope='col'
                  className='whitespace-nowrap px-6 py-4 text-[14px] font-light text-gray-900'
                >
                  <span className='flex font-medium'>STATUS</span>
                </th>
                <th
                  scope='col'
                  className='whitespace-nowrap px-6 py-4 text-[14px] font-light text-gray-900'
                >
                  <span className='flex font-medium'>ACTION</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {history?.map((hist: HistoryTypes) => (
                <tr key={hist.id} className='border-b bg-white text-sm'>
                  <th
                    scope='row'
                    className='whitespace-nowrap px-6 py-4 font-light text-gray-900'
                  >
                    <div className='flex gap-2'>
                      <span>{formatDateAndTime(hist.created_at).Date}</span>
                      <span>{formatDateAndTime(hist.created_at).Time}</span>
                    </div>
                  </th>
                  <td className='px-6 py-4'>{hist.reference}</td>
                  <td className='px-6 py-4'>{moneyFormat(hist.cost)}</td>
                  <td className='px-6 py-4'>{hist.name}</td>
                  <td className='px-6 py-4'>Success</td>
                  <td className='px-6 py-4'>
                    {/* <ViewTransaction trnx={hist} /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* pagination */}
          <div className='mt-5'>
            <Pagination
              totalRecords={allHistory.total_records}
              totalPages={allHistory?.total_pages}
              currentPage={currentPage}
              noOfCurrentPageRecords={allHistory?.response?.length}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityTable;

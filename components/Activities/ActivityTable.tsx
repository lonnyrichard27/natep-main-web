'use client';

import { useEffect, useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { IoFilterOutline } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { formatDateAndTime } from '@/util/helpers';
import { SearchInput } from '@/components/elements';
import { EmptyState, PageLoader } from '@/components/Navigation';
import ExportSheet from '../elements/ExportSheet';
import Pagination from '../Pagination';
import { fetchActivities } from '@/api/user';

export interface ActivityTypes {
  id: string;
  activity: string;
  requester: string;
  role_id: number;
  user: string;
  reference: string | null;
  created_at: string;
  updated_at: string | null;
}

const ActivityTable = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset currentPage to 1 when searchQuery changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const {
    data: allActivities,
    isLoading: activitiesLoading,
    error
  } = useQuery({
    queryKey: ['activities', currentPage, searchQuery],
    queryFn: () =>
      fetchActivities({ page_num: currentPage, search: searchQuery })
  });

  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const activities = allActivities?.response || null;

  const { data: fileCode } = useQuery({
    queryKey: ['download-sheet', currentPage, searchQuery],
    queryFn: () =>
      fetchActivities({
        page_num: currentPage,
        search: searchQuery,
        download: false
      })
  });

  if (error)
    return <EmptyState title='Error!' desc='Could not load the table' />;

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

        {/* <div>{fileCode && <ExportSheet fileCode={fileCode} />}</div> */}
      </div>

      {activitiesLoading ? (
        <PageLoader />
      ) : (
        <>
          <table className='w-full overflow-x-auto text-left text-sm'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th
                  scope='col'
                  className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'
                >
                  <span className='flex font-medium'>
                    TIMESTAMP
                    {/* <FaSort className='text-[#D0D5DD]' /> */}
                  </span>
                </th>
                <th
                  scope='col'
                  className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'
                >
                  <span className='flex font-medium'>
                    ACTIVITY
                    {/* <FaSort className='text-[#D0D5DD]' /> */}
                  </span>
                </th>
                <th
                  scope='col'
                  className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'
                >
                  <span className='flex font-medium'>REQUESTER</span>
                </th>
                {/* <th
                  scope='col'
                  className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'
                >
                  <span className='flex font-medium'>ACTION</span>
                </th> */}
              </tr>
            </thead>

            <tbody>
              {activities?.map((act: ActivityTypes) => (
                <tr key={act.id} className='border-b bg-white'>
                  <td className='whitespace-nowrap text-sm font-light text-gray-900'>
                    <div className='flex gap-2'>
                      <span>{formatDateAndTime(act.created_at).Date}</span>
                      <span>{formatDateAndTime(act.created_at).Time}</span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-sm font-light'>
                    {act.activity}
                  </td>
                  <td className='px-6 py-4 text-sm font-light'>
                    {act.requester}
                  </td>
                  {/* <td className='px-6 py-4 text-sm font-light'>
                    <CertificateTableActions cert={cert} />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* pagination */}
          <div className='mt-5'>
            <Pagination
              totalRecords={allActivities.total_records}
              totalPages={allActivities?.total_pages}
              currentPage={currentPage}
              noOfCurrentPageRecords={allActivities?.response?.length}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityTable;

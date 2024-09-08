import React from 'react';
import ViewDelivery from './ViewDelivery';
import { EmptyState, PageLoader } from '@/components/Navigation';
import { useQuery } from '@tanstack/react-query';
import { getOngoingDeliveries } from '@/services/certificate-services';

const OngoingDeliveries = () => {
  const { data: allDeliveries, isLoading: deliveriesLoading } = useQuery({
    queryKey: ['ongoing-deliveries'],
    queryFn: () => getOngoingDeliveries(),
  });

  console.log(allDeliveries?.response);

  return (
    <div className='flex h-fit flex-col gap-6 rounded-lg border border-[#F2F4F7] p-10'>
      <h2 className='font-semibold'>Ongoing Deliveries</h2>

      {deliveriesLoading ? (
        <PageLoader />
      ) : allDeliveries?.response?.length > 0 ? (
        <div>
          <h3 className='text-xs font-light text-[#98A2B3]'>
            TUESDAY, 06 DEC 2022
          </h3>
          <hr className='my-4 text-gray-400' />

          <article>
            <ViewDelivery />
          </article>
        </div>
      ) : (
        <EmptyState
          title='No Delivery'
          desc='You do not have any ongoing delivery. Please click on the button below to request a delivery.'
        />
      )}
    </div>
  );
};

export default OngoingDeliveries;

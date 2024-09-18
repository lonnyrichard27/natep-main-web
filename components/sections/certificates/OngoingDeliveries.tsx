import React, { useMemo } from 'react';
import ViewDelivery from './ViewDelivery';
import { EmptyState, PageLoader } from '@/components/Navigation';
import { useQuery } from '@tanstack/react-query';
import { getOngoingDeliveries } from '@/services/certificate-services';
import { DeliveryTypes } from '@/types/DeliveryTypes';

const OngoingDeliveries = () => {
  const { data: allDeliveries, isLoading: deliveriesLoading } = useQuery({
    queryKey: ['ongoing-deliveries'],
    queryFn: () => getOngoingDeliveries(),
  });

  // Function to group data by date
  const groupByDate = (array: any) => {
    return array?.reduce(
      (result: { [x: string]: any[] }, currentItem: { created_at: string }) => {
        const date = currentItem.created_at.split('T')[0]; // Extract date
        if (!result[date]) {
          result[date] = [];
        }
        result[date].push(currentItem);
        return result;
      },
      {} as Record<string, any[]>
    );
  };

  const groupedData = useMemo(() => {
    return groupByDate(allDeliveries?.response);
  }, [allDeliveries?.response]);

  return (
    <div className='flex h-fit flex-col gap-6 rounded-lg border border-[#F2F4F7] p-10'>
      <h2 className='font-semibold'>Ongoing Deliveries</h2>

      {deliveriesLoading ? (
        <PageLoader />
      ) : Object.keys(groupedData)?.length > 0 ? (
        <div className='flex flex-col gap-8'>
          {Object.keys(groupedData).map((date) => {
            // Format the date to a human-readable form
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <div key={date}>
                <h3 className='text-xs font-light text-[#98A2B3]'>
                  {formattedDate.toUpperCase()}
                </h3>
                <hr className='my-4 text-gray-400' />

                <article>
                  {groupedData[date].map(
                    (delivery: DeliveryTypes, index: number) => (
                      <ViewDelivery key={index} delivery={delivery} />
                    )
                  )}
                </article>
              </div>
            );
          })}
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

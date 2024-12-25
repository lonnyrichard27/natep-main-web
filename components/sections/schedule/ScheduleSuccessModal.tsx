import { Modal } from '@/components/elements';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const ScheduleSuccessModal = ({
  closeLink = DashboardRoutes.BIODATA,
}: {
  closeLink?: string;
}) => {
  const { push } = useRouter();

  return (
    <>
      <Modal open={true} size='xs' closeClick={() => push(closeLink)} closable>
        <div className='flex flex-col items-center justify-center gap-5 p-5 text-center'>
          <IoIosCheckmarkCircleOutline className='text-6xl text-green-600' />

          <h2 className='text-lg font-semibold text-green-600 md:text-2xl'>
            Schedule Successful!
          </h2>

          <p className='text-sm md:text-base'>
            Well done! You have successfully created a schedule.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ScheduleSuccessModal;
